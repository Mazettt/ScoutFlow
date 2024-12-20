import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  notification,
  Select,
  Space,
  Spin,
  Typography,
  Cascader,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAPI } from "../Contexts/API";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Register() {
  const [form] = Form.useForm();
  const api = useAPI();
  const auth = getAuth();
  const [loaded, setLoaded] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
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
    let roles = [];
    let units = [];

    values.fonction.forEach((f) => {
      console.log(f);
      if (f[0] == "Violet") {
        roles.push(f[1]);
        if (f[1] == "Accoco") {
          units.push(f[2]);
        }
      } else if (f[0] == "Chef") {
        roles.push(f[0]);
        units.push(f[f.length - 1]);
      } else if (f[0] == "Compa") {
        roles.push(f[0]);
        units.push(f[1]);
      }
    });

    // Remove duplicates
    roles = [...new Set(roles)];
    units = [...new Set(units)];

    try {
      setCreateLoading(true);
      await api.post("/auth/register", {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phoneNumber: "+" + values.phonePrefix + values.phone,
        password: values.password,
        roles,
        units,
      });
      const user = await signInWithEmailAndPassword(auth, values.email, values.password);
      const idToken = await user.user.getIdToken();
      await api.post("/auth/login", { idToken: idToken });
      await auth.signOut();
      await api.get("/auth/profile");
      setCreateLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      openNotification(
        "error",
        "Erreur lors de la création du compte",
        error.response?.data?.msg ??
          error.response?.data?.title ??
          error.message ??
          "Erreur inconnue"
      );
      setCreateLoading(false);
    }
  };

  const prefixSelector = (
    <Form.Item name='phonePrefix' noStyle>
      <Select style={{ width: 70 }} disabled>
        <Select.Option value='33'>+33</Select.Option>
      </Select>
    </Form.Item>
  );
  const unites = [
    {
      value: "Farfa",
      label: "Farfadets",
    },
    {
      value: "LJ",
      label: "Louveteaux/Jeannettes",
      children: [
        {
          value: "LJ3",
          label: "LJ3",
        },
        {
          value: "LJ7",
          label: "LJ7",
        },
      ],
    },
    {
      value: "SG",
      label: "Scouts/Guides",
      children: [
        {
          value: "SG3",
          label: "SG3",
        },
        {
          value: "SG7",
          label: "SG7",
        },
      ],
    },
    {
      value: "PK",
      label: "Pionniers/Caravelles",
    },
  ];
  const compa = [
    {
      value: "Compa'd'tente",
      label: "Compa'd'tente",
    },
    {
      value: "Incomparables",
      label: "Les incomparables",
    },
  ];
  const options = [
    {
      value: "Violet",
      label: "Violet",
      children: [
        {
          value: "RG",
          label: "RG",
        },
        {
          value: "RespMatos",
          label: "Responsable matériel",
        },
        {
          value: "RespCleophas",
          label: "Responsable cléophas",
        },
        {
          value: "RespCompta",
          label: "Responsable comptabilité",
        },
        {
          value: "RespSecretaire",
          label: "Responsable secrétariat",
        },
        {
          value: "Accoco",
          label: "Accoco",
          children: compa,
        },
      ],
    },
    {
      value: "Chef",
      label: "Chef/Cheftaine",
      children: unites,
    },
    {
      value: "Compa",
      label: "Compagnon",
      children: compa,
    },
  ];

  return (
    <Flex vertical align='center' justify='center' gap={50} style={{ height: "100vh" }}>
      <Space direction='vertical' align='center' size={0}>
        <Typography.Title level={1}>Inscription</Typography.Title>
        <Typography.Text>Veuillez vous inscrire pour accéder à ScoutFlow.</Typography.Text>
      </Space>
      {(loaded === false && <Spin indicator={<LoadingOutlined spin />} size='large' />) || (
        <>
          {contextHolder}
          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            initialValues={{
              phonePrefix: "33",
            }}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >
            <Space direction='horizontal' size={0}>
              <Form.Item
                name='firstname'
                label='Prénom'
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre prénom.",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='lastname'
                label='Nom'
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre nom.",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>

            <Form.Item
              name='email'
              label='E-mail'
              rules={[
                {
                  type: "email",
                  message: "L'entrée n'est pas un e-mail valide.",
                },
                {
                  required: true,
                  message: "Veuillez entrer votre e-mail.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name='password'
              label='Mot de passe'
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre mot de passe.",
                },
                {
                  min: 8,
                  message: "Le mot de passe doit contenir au moins 8 caractères.",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirmation'
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Veuillez confirmer votre mot de passe.",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Le mot de passe de confirmation ne correspond pas au mot de passe."
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='phone'
              label='Numéro de téléphone'
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre numéro de téléphone.",
                },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name='fonction'
              label='Fonction'
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner votre fonction.",
                },
              ]}
            >
              <Cascader
                style={{ width: "100%" }}
                options={options}
                showCheckedStrategy={Cascader.SHOW_CHILD}
                multiple
                maxTagCount='responsive'
              />
            </Form.Item>
            <Form.Item
              name='agreement'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error("Vous devez accepter les conditions d'utilisation.")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                J'ai lu et j'accepte les <Link to={""}>conditions d'utilisation</Link>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Space direction='vertical  ' size={0}>
                <Button type='primary' loading={createLoading} htmlType='submit'>
                  Créer un compte
                </Button>
                <Link to='/login'>Vous avez déjà un compte ?</Link>
              </Space>
            </Form.Item>
          </Form>
        </>
      )}
    </Flex>
  );
}
