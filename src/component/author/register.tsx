import { Button, Form, Input, Select, Card, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Title } = Typography;
const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },

  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
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
      offset: 5,
    },
  },
};

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const { push } = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const user = localStorage.getItem("id")
    if (user) {
      push("/")
    }
  }, [])

  const onFinish = async (values: any) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
    }
    setLoading(true)
    try {
      await axios.post('/api/auth/local/register', data)
      message.success('Đăng ký thành công vui lòng xác nhận email')
      setLoading(false)
      push("/auth/login")
    } catch (error: any) {
      if (typeof error.response !== 'undefined') {
        message.error(error.response.data.error.message)
      }
      setLoading(false)
    }
  };

  return (
    <>
      <div className='w-full m-auto h-[100vh] bg-slate-50 flex justify-center items-center' >
        <Card bordered={false} >
          <Title level={2} className='text-center'>Đăng ký</Title>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: 800, width: "100%" }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Nhập Username từ 8-16 ký tự',
                  min: 8,
                  max: 16
                },
              ]}
            >
              <Input placeholder='Nhập username' />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              className=''
              rules={[
                {
                  type: 'email',
                  message: 'Sai định dạng E-Mail!',
                },
                {
                  required: true,
                  message: 'Vui lòng nhập E-Mail!',
                },
              ]}
            >
              <Input placeholder='Nhập email' />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: 'Nhập mật khẩu tối thiểu 6 ký tự',
                  min: 6
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder='Nhập mật khẩu' />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Nhập lại Mật Khẩu"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Nhập lại mật khẩu' />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Đăng ký
              </Button>
              <Link href='/' className='ml-2'>
                <Button danger>
                  Về trang chủ
                </Button>
              </Link>
            </Form.Item>
          </Form>

        </Card>
      </div>
    </>
  );
};

export default Register;