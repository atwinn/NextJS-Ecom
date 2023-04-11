import React, { useEffect, useRef, useState } from "react";
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
import Image from "next/image";
import logo from "../../assets/logoL3M.png";

const App: React.FC = () => {
  const userName = useRef("");
  const pass = useRef("");
  const [loginGG, setLoginGG] = useState("")
  const { push } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = () => {
    const data = {
      identifier: userName.current,
      password: pass.current,
    }

    axios.post("https://l3mshop.onrender.com/api/auth/local", data).then(res => {
      if (res.status === 200) {
        localStorage.setItem("username", res.data.user.username)
        localStorage.setItem("id", res.data.user.id)
        setCookie("token", res.data.jwt)
        dispatch(setUser(res.data.user));
        push("/")
      }
    })
  };

  const loginGoogle = () => {
    push("https://l3mshop.onrender.com/api/connect/google")
  }

  return (
    <>
      <div className="w-full m-auto h-[100vh] bg-slate-50 flex justify-center items-center">
        <Card bordered={false} className="sm:w-[35%] md:w-[30%] lg:w-[25%] xl:w-[20%]">
          <Link href={"/sanpham"} className="flex justify-center mb-2"><Image src={logo} alt="" height={100} /></Link>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng nhập username của bạn!" },
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
                { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => (pass.current = e.target.value)}
              />
            </Form.Item>
            {/* <div className="flex justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Duy trì đăng nhập</Checkbox>
              </Form.Item> */}
            <Form.Item>
              <Link className="login-form-forgot" href={pageRoutes.forgotPass.route}>
                Quên mật khẩu
              </Link>
            </Form.Item>
            {/* </div> */}
            <div className="flex justify-between">
              <Form.Item >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <p className="lg:block hidden mt-2">Hoặc</p>
              <Link href={pageRoutes.register.route}>
                <Button
                  type="primary"
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
