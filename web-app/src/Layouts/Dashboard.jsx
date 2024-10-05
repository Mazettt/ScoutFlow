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
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Image, Layout, Menu, Spin, theme, Typography } from "antd";
import logo from "../Assets/sgdf_logo_white.png";
import { useAPI } from "../Contexts/API";
import { CurrentUserProvider } from "../Contexts/CurrentUser";

const items = [
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
];

export default function DashboardLayout() {
  const currentMenuItem = window.location.pathname.split("/")[2] || "home";
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const api = useAPI();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  const dropDownItems = [
    {
      key: "1",
      label: <Typography.Text>{user?.email}</Typography.Text>,
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

  useEffect(() => {
    api
      .get("/auth/profile")
      .then((response) => {
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
      <Layout hasSider>
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
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
          <Menu theme='dark' mode='inline' defaultSelectedKeys={[currentMenuItem]} items={items} />
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
                {items.find((item) => item.key === currentMenuItem)?.label.props.children}
              </Typography.Title>
            </Flex>
            <Flex align='center'>
              <Typography.Text style={{ color: "black", marginInline: 16 }}>
                {user.displayName}
              </Typography.Text>
              <Dropdown
                menu={{ items: dropDownItems }}
                trigger={["click"]}
                placement='bottomRight'
                arrow={{ pointAtCenter: true }}
              >
                <Button type='primary' shape='circle'>
                  {user.displayName[0]}
                </Button>
              </Dropdown>
            </Flex>
          </Layout.Header>
          <Layout.Content
            style={{ margin: "24px 16px 0", overflow: "initial", minHeight: "calc(100vh - 153px)" }}
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
              <CurrentUserProvider user={user}>
                <Outlet />
              </CurrentUserProvider>
            </div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center" }}>
            ScoutFlow ©{new Date().getFullYear()} Créé par le groupe SGDF Belfort
          </Layout.Footer>
        </Layout>
      </Layout>
    )
  );
}
