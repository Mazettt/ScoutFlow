import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Space, Typography, Spin, notification, Cascader } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAPI } from "../Contexts/API";

export default function Login() {
  const [form] = Form.useForm();
  const api = useAPI();
  const auth = getAuth();
  const [loaded, setLoaded] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const [antd, contextHolder] = notification.useNotification();

  const openNotification = (type, mess, desc) => {
    antd[type]({
      message: mess,
      description: desc,
    });
  };

  useEffect(() => {
    api
      .get("/auth/profile")
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  const onFinish = async (values) => {
    try {
      setLoginLoading(true);
      const user = await signInWithEmailAndPassword(auth, values.email, values.password);
      const idToken = await user.user.getIdToken();
      await api.post("/auth/login", { idToken: idToken });
      await auth.signOut();
      await api.get("/auth/profile");
      setLoginLoading(false);
      navigate("/dashboard");
    } catch (error) {
      let desc = "";
      if (error.code === "auth/invalid-credential") {
        desc = "Email ou mot de passe incorrect.";
      } else if (error.code === "auth/too-many-requests") {
        desc = "Trop de tentatives de connexion. Veuillez réessayer plus tard.";
      } else {
        desc = error.response?.data?.msg ?? error.response?.data?.title ?? error.response?.data?.message ?? error.message ?? "Erreur inconnue";
      }
      console.log(error);
      openNotification(
        "error",
        "Erreur lors de la connection",
        desc
      );
      setLoginLoading(false);
    }
  };

  return (
    <Flex vertical align='center' justify='center' gap={50} style={{ height: "100vh" }}>
      <Space direction='vertical' align='center' size={0}>
        <Typography.Title level={1}>Connexion</Typography.Title>
        <Typography.Text>Veuillez vous connecter pour accéder à ScoutFlow.</Typography.Text>
      </Space>
      {(loaded === false && <Spin indicator={<LoadingOutlined spin />} size='large' />) || (
        <>
          {contextHolder}
          <Form
            form={form}
            name='login'
            initialValues={{
              remember: true,
            }}
            style={{
              maxWidth: 360,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre email.",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder='Email' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre mot de passe.",
                },
              ]}
            >
              <Input prefix={<LockOutlined />} type='password' placeholder='Mot de passe' />
            </Form.Item>
            <Form.Item>
              <Button block type='primary' loading={loginLoading} htmlType='submit'>
                Se connecter
              </Button>
              <Space direction='vertical' size={0} style={{ marginTop: "10px" }}>
                <Link to=''>Mot de passe oublié</Link>
                <Link to='/register'>Vous n'avez pas de compte ?</Link>
              </Space>
            </Form.Item>
          </Form>
        </>
      )}
    </Flex>
  );
}
