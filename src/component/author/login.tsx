import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, message, Form, Input, Space } from "antd";
import { Typography } from "antd";
import {
  GoogleOutlined,
  GithubOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import "../../styles/Home.module.css";
import Link from "next/link";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import Divider1 from "../devider";
import type { CSSProperties } from "react";
import { setCookie } from "../../../cookies";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};
import axios, { CancelToken } from "axios"
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/logoL3M.png";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("id")
    if (user) {
      push("/")
    }
  }, [])

  const onFinish = async (values: any) => {
    setLoading(true);
    const data = {
      identifier: values.username,
      password: values.password,
    };
    const source = axios.CancelToken.source()
    const timeout = setTimeout(() => {
      source.cancel("Request timeout")
      message.warning("Hết thời gian vui lòng đăng nhập lại!")
      setLoading(false);
    }, 5000);
    try {
      const res = await axios.post("/api/auth/local", data, {
        cancelToken: source.token
      });
      clearTimeout(timeout)
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("id", res.data.user.id);
      setCookie("token", res.data.jwt);
      const userId = res.data.user.id;
      const res2 = await axios.get(`/api/users/${userId}?populate=*`);
      const role = res2.data.role.id;
      setCookie("role", role);
      setLoading(false);
      if (role === 3 || role === 4 || role === 6) push("/page-admin")
      else push("/")
    } catch (error: any) {
      if (typeof error.response !== 'undefined') {
        message.error(error.response.data.error.message)
      }
      clearTimeout(timeout)
      setLoading(false);
    }
  }

  const loginGoogle = () => {
    push("https://l3mshop.onrender.com/api/connect/google")
  }

  return (
    <>
      <div className="w-full m-auto h-[100vh] bg-slate-50 flex justify-center items-center">
        <Card bordered={false} className="max-w-[400px] w-full">
          <Link href={"/"} className="flex justify-center mb-2"><Image src={logo} alt="" height={100} /></Link>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='username'
              rules={[
                { required: true, message: "Vui lòng nhập Username hoặc E-mail!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username hoặc E-mail"
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Link className="login-form-forgot" href={pageRoutes.forgotPass.route}>
                Quên mật khẩu
              </Link>
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <p className="sm:block hidden mt-2">Hoặc</p>
              <Link href={pageRoutes.register.route}>
                <Button
                  danger
                  size="large"
                >
                  Đăng ký
                </Button></Link>
            </div>
          </Form>
          <Divider1 name="Cách khác" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Space align="center" size={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <GoogleOutlined
                  style={{ ...iconStyles, color: "#000" }}
                  className="hover:text-2xl"
                  onClick={loginGoogle} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <GithubOutlined
                  style={{ ...iconStyles, color: "#000" }}
                  className="hover:text-2xl" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <FacebookOutlined
                  style={{ ...iconStyles, color: "#333333" }}
                  className="hover:text-2xl" />
              </div>
            </Space>
          </div>
        </Card>
      </div>
    </>
  );
};
export default App;
