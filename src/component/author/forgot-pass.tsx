import React from "react";
import { Button, Card, Form, Input, Space } from "antd";
import { Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
const { Title } = Typography;
import "../../styles/Home.module.css";
import axios from "axios";
import { message } from "antd"

const App: React.FC = () => {
  const onFinish = async (values: any) => {
    const data = {
      email: values.email
    }
    try {
      axios.post("/api/auth/forgot-password", data)
      message.success('Vui lòng kiểm tra email của bạn để đặt lại mật khẩu')
    } catch (error: any) {
      if (typeof error.response !== 'undefined') {
        message.error(error.response.data.error.message)
      }
    }

  };
  return (
    <>
      <div className="w-full m-auto h-[100vh] bg-slate-50 flex justify-center items-center">
        <Card bordered={false}>
          <Title level={3} className="text-center">
            Nhập E-mail
          </Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email của bạn!" }]}
            >
              <Input
                size="large"
                type="email"
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};
export default App;
