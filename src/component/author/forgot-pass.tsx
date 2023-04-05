import React from "react";
import { Button, Card, Form, Input, Space } from "antd";
import { Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
const { Title } = Typography;
import "../../styles/Home.module.css";

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <div className="w-full m-auto h-[100vh] bg-slate-50 flex justify-center items-center">
        <Card bordered={false}>
          <Title level={2} className="text-center">
            Forgot pass
          </Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};
export default App;
