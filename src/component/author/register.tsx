import type { CascaderProps } from 'antd';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Card,
  message
} from 'antd';
import React, { useState } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import { setCookie } from '../../../cookies';

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
    sm: { span: 8 },

  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
    }

    axios.post('/api/auth/local/register', data).then((res: any) => {
      if (res.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'Đăng ký thành công',
        });
      }
    })
  };

  return (
    <>
      {contextHolder}


      <div className='w-full m-auto h-[100vh] bg-slate-50 flex justify-center items-center' >
        <Card bordered={false} >
          <Title level={2} className='text-center'>Đăng ký</Title>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            // initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 800, width: "400px" }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Username"
              className=''
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Username!',
                },
              ]}
            >
              <Input />
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
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
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
              <Input.Password />
            </Form.Item>
            {/* <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item> */}
            {/* <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item> */}
            {/* <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item> */}
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

        </Card>
      </div>
    </>
  );
};

export default Register;