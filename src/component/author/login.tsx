import React, { useRef, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Space } from "antd";
import { Typography } from "antd";
import {
  GoogleOutlined,
  GithubOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
import "../../styles/Home.module.css";
import Link from "next/link";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import Divider1 from "../devider";
import type { CSSProperties } from "react";
import { setCookie } from "../../../cookies";
import { setUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};
import axios from "axios"
import { useRouter } from "next/navigation";


const App: React.FC = () => {
  const userName = useRef("");
  const pass = useRef("");
  const { push } = useRouter();
  const dispatch = useDispatch();

  const onFinish = () => {
    const data = {
      identifier: userName.current,
      password: pass.current,
    }

    axios.post("https://l3mshop.onrender.com/api/auth/local", data).then(res => {
      if (res.status === 200) {
        localStorage.setItem("username", res.data.user.username)
        setCookie("token", res.data.jwt)
        dispatch(setUser(res.data.user));
        push("/sanpham")
      }
    })
  };

  return (
    <>
      <div className="w-full m-auto h-[100vh] bg-slate-50 flex justify-center items-center">
        <Card bordered={false}>
          <Title level={2} className="text-center">
            Login
          </Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={(e) => (userName.current = e.target.value)}
              />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={(e) => (pass.current = e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className="login-form-forgot" href={pageRoutes.forgotPass.route}>
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link href={pageRoutes.register.route}>Register</Link>
            </Form.Item>
          </Form>
          <Divider1 name="Login other" />
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
                <GoogleOutlined style={{ ...iconStyles, color: "#000" }} />
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
                <GithubOutlined style={{ ...iconStyles, color: "#000" }} />
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
                <FacebookOutlined style={{ ...iconStyles, color: "#333333" }} />
              </div>
            </Space>
          </div>
        </Card>
      </div>
    </>
  );
};
export default App;
