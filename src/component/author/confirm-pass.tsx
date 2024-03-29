import { Button, Form, Input, Card, message } from 'antd';
import React, { useState } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

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
    const searchParams = useSearchParams();
    const resetCode = searchParams.get("code");
    const { push } = useRouter()

    const onFinish = async (values: any) => {

        const data = {
            code: resetCode,
            password: values.password,
            passwordConfirmation: values.confirm,
        }
        try {
            await axios.post('/api/auth/reset-password', data)
            message.success('Đặt lại mật khẩu thành công')
            setTimeout(() => {
                push("/auth/login")
            }, 1000)
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
        }
    }

    return (
        <>
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