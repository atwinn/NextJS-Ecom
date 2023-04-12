import React, { useState } from 'react'
import moment from 'moment';
import { Form, Input, Button, Select, DatePicker } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const { TextArea } = Input;
const { Option } = Select;
dayjs.extend(customParseFormat);

const UserUpdateForm = ({ userUpdateData }: any) => {
    const dateFormat = 'DD/MM/YYYY';
    const onFinish = (values: any) => {
        const ngaySinhFormatted = moment(values.ngaySinh.toString()).format('YYYY-MM-DD');
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="updateUserForm"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Họ và tên"
                    name="ten"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!' }]}
                    initialValue={userUpdateData.attributes.ten}
                >
                    <Input placeholder='Họ và tên' value={userUpdateData.attributes.ten} />
                </Form.Item>

                <Form.Item
                    label="Điện thoại"
                    name="sdt"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
                    initialValue={userUpdateData.attributes.sdt}
                >
                    <Input placeholder='Số điện thoại' value={userUpdateData.attributes.sdt} />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="diachi"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}
                    initialValue={userUpdateData.attributes.diaChi}
                >
                    <TextArea rows={4} placeholder='Địa chỉ' value={userUpdateData.attributes.diaChi} />
                </Form.Item>

                <Form.Item
                    label="Giới tính"
                    name="gioiTinh"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính của bạn' }]}
                >
                    <Select placeholder="Chọn giới tính" >
                        <Option value={true}>Nam</Option>
                        <Option value={false}>Nữ</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Ngày Sinh" name="ngaySinh" initialValue={dayjs('01/10/2001', dateFormat)}>
                    <DatePicker placeholder='Chọn ngày' format={dateFormat}
                        value={dayjs('01/10/2001', dateFormat)}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserUpdateForm