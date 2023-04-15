import React, { useState } from 'react'
import { Form, Input, Button, Select, DatePicker, message } from 'antd'
import axios from 'axios';

const UserPassChange = ({ close }: any) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: any) => {
        console.log(values);
        form.resetFields()
        close();

        // try {
        //     const res = await axios.put(`/api/khach-hangs/${userUpdateData.id}`, data)
        //     messageApi.open({
        //         type: 'success',
        //         content: "Thay đổi thành công",
        //     });
        //     close();
        // } catch (error: any) {
        //     if (typeof error.response !== 'undefined') {
        //         if (error.response.status === 400) {
        //             messageApi.open({
        //                 type: 'error',
        //                 content: error.response.data.error.message,
        //             });
        //         }
        //         if (error.response.status === 500) {
        //             messageApi.open({
        //                 type: 'error',
        //                 content: error.response.data.error.message,
        //             });
        //         }
        //     }
        // }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            {contextHolder}
            <Form
                form={form}
                name="updateUserForm"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldpass"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                    hasFeedback
                >
                    <Input.Password placeholder='Nhập mật khẩu cũ' />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="pass"
                    dependencies={['oldpass']}
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('oldpass') === value) {
                                return Promise.reject(new Error('Mật khẩu mới trùng mật khẩu cũ!'))
                            }
                            return Promise.resolve();
                        },
                    }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Nhập mật khẩu mới' />
                </Form.Item>

                <Form.Item
                    label="Nhập lại Mật Khẩu"
                    name="confirm"
                    dependencies={['pass']}
                    rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('pass') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                        },
                    }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Nhập lại mật khẩu vừa đặt' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
                    <Button type="primary" htmlType="submit">
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserPassChange