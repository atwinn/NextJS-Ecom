import { Button, Form, Input, Card, message } from 'antd';
import React, { useState } from 'react';
import { Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

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

const CP: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: any) => {
        const searchParams = new URLSearchParams(window.location.search);
        const resetCode = searchParams.get("code");
        const data = {
            code: resetCode,
            password: values.password,
            passwordConfirmation: values.confirm,
        }

        axios.post('/api/auth/reset-password', data).then((res: any) => {
            messageApi.open({
                type: 'success',
                content: 'Đặt lại mật khẩu thành công',
            });
        }
        )
    };

    return (
        <>
            {contextHolder}
            <div className='w-full m-auto h-[100vh] bg-slate-50 flex justify-center items-center' >
                <Card bordered={false} >
                    <Title level={3} className='text-center'>Đặt lại mật khẩu</Title>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        style={{ maxWidth: 800, width: "400px" }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="password"
                            label="Mật khẩu mới"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu mới của bạn!',
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
                                    message: 'Vui lòng nhập lại mật khẩu mới của bạn!',
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
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Đặt lại mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
        </>
    );
};

export default CP;