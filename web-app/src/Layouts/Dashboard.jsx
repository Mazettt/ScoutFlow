import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  BarChartOutlined,
  TeamOutlined,
  LoadingOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  KeyOutlined,
  CodepenOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CloudOutlined,
  UnlockOutlined
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Image, Layout, Menu, Spin, theme, Typography } from "antd";
import logo from "../Assets/sgdf_logo_white.png";
import { useAPI } from "../Contexts/API";
import { CurrentUserProvider, useCurrentUser } from "../Contexts/CurrentUser";
import RoleAccess from "../Components/RoleAccess";

export default function DashboardLayout() {
  const api = useAPI();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/profile")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    (!user && (
      <Flex vertical align='center' justify='center' style={{ height: "100vh" }}>
        <Spin indicator={<LoadingOutlined spin />} size='large' />
      </Flex>
    )) || (
      <CurrentUserProvider user={user}>
        <RoleAccess allOf={["Verified"]}>
          <RoleAccess.Authorized>
            <VerifiedLayout />
          </RoleAccess.Authorized>
          <RoleAccess.Unauthorized>
            <NotVerifiedLayout />
          </RoleAccess.Unauthorized>
        </RoleAccess>
      </CurrentUserProvider>
    )
  );
}

function VerifiedLayout() {
  const currentMenuItem = window.location.pathname.split("/")[2] || "home";
  const [collapsed, setCollapsed] = useState(false);
  const user = useCurrentUser();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "home",
      icon: React.createElement(HomeOutlined),
      label: <Link to={"/dashboard"}>Accueil</Link>,
    },
    {
      key: "matos",
      icon: React.createElement(CodepenOutlined),
      label: <Link to={"/dashboard/matos"}>Matériel</Link>,
    },
    {
      key: "finance",
      icon: React.createElement(BarChartOutlined),
      label: <Link to={"/dashboard/finance"}>Finance</Link>,
    },
    {
      key: "membres",
      icon: React.createElement(TeamOutlined),
      label: <Link to={"/dashboard/membres"}>Membres</Link>,
    },
    {
      key: "calendrier",
      icon: React.createElement(CalendarOutlined),
      label: <Link to={"/dashboard/calendrier"}>Calendrier</Link>,
    },
    {
      key: "catalogue",
      icon: React.createElement(UnorderedListOutlined),
      label: <Link to={"/dashboard/catalogue"}>Catalogue</Link>,
    },
    {
      key: "cles",
      icon: React.createElement(KeyOutlined),
      label: <Link to={"/dashboard/cles"}>Clés</Link>,
    },
    {
      key: "drive",
      icon: React.createElement(CloudOutlined),
      label: <Link to={"/dashboard/drive"}>Drive</Link>,
    },
    {
      key: "access",
      icon: React.createElement(UnlockOutlined),
      label:<Link to={"/dashboard/access"}>Access</Link>,
    },
  ];

  return (
    <Layout hasSider>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          paddingTop: 10,
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarColor: "unset",
        }}
      >
        <Flex style={{ height: 32, margin: 16 }} justify='center' align='center' vertical={false}>
          <Image src={logo} width={60} preview={false} />
          {!collapsed && (
            <Typography.Title level={4} style={{ color: "white", margin: 0 }}>
              ScoutFlow
            </Typography.Title>
          )}
        </Flex>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[currentMenuItem]}
          items={menuItems}
        />
      </Layout.Sider>
      <Layout style={{ marginInlineStart: collapsed ? 80 : 200 }}>
        <Layout.Header
          style={{
            background: colorBgContainer,
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 24,
            paddingRight: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Flex align='center'>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {menuItems.find((item) => item.key === currentMenuItem)?.label.props.children}
            </Typography.Title>
          </Flex>
          <ProfileMenu u={user} />
        </Layout.Header>
        <Layout.Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: "calc(100vh - 153px)",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: "100%",
            }}
          >
            <Outlet />
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>
          ScoutFlow ©{new Date().getFullYear()} Créé par le groupe SGDF Belfort
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}

function NotVerifiedLayout() {
  const user = useCurrentUser();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Layout.Header
        style={{
          background: colorBgContainer,
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 24,
          paddingRight: 24,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <ProfileMenu u={user} />
      </Layout.Header>
      <Layout.Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
          minHeight: "calc(100vh - 153px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Typography.Title level={2}>Votre compte n'est pas encore vérifié</Typography.Title>
        <Typography.Text>
          Veuillez attendre que les administrateurs ou les RG vérifient votre demande de création de
          compte.
        </Typography.Text>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        ScoutFlow ©{new Date().getFullYear()} Créé par le groupe SGDF Belfort
      </Layout.Footer>
    </Layout>
  );
}

function ProfileMenu({ u }) {
  const api = useAPI();
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  const dropDownItems = [
    {
      key: "1",
      label: <Typography.Text>{u?.email}</Typography.Text>,
      disabled: true,
    },
    {
      key: "2",
      label: <Link to={"/dashboard/profil"}>Profil</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: <Link to={"/dashboard/parametres"}>Paramètres</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: "4",
      label: <Link onClick={logout}>Se déconnecter</Link>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    u && (
      <Flex align='center'>
        <Typography.Text style={{ color: "black", marginInline: 16 }}>
          {u.displayName}
        </Typography.Text>
        <Dropdown
          menu={{ items: dropDownItems }}
          trigger={["click"]}
          placement='bottomRight'
          arrow={{ pointAtCenter: true }}
        >
          <Button type='primary' shape='circle'>
            {u.displayName ? u.displayName[0] : "?"}
          </Button>
        </Dropdown>
      </Flex>
    )
  );
}
