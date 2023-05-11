import React, { useState } from 'react'
import moment from 'moment';
import { Form, Input, Button, Select, DatePicker, message } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;
// dayjs.extend(customParseFormat);

const UserUpdateForm = ({ userUpdateData, close, fetch, form }: any) => {
    const dateFormat = 'DD/MM/YYYY';

    const onFinish = async (values: any) => {
        const ngaySinhFormatted = moment(values.ngaySinh.toString()).format('YYYY-MM-DD');
        const data = {
            data: {
                ten: values.ten,
                sdt: values.sdt,
                diaChi: values.diachi,
                gioiTinh: values.gioiTinh,
                ngaySinh: ngaySinhFormatted,
            }
        }
        try {
            await axios.put(`/api/khach-hangs/${userUpdateData.id}`, data)
            message.success("Thay đổi thành công");
            close();
            fetch();
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const defaultDate = dayjs('1999-02-01');

    return (
        <div>
            <Form
                form={form}
                name="updateUserForm"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    ten: userUpdateData.attributes.ten,
                    sdt: userUpdateData.attributes.sdt,
                    diachi: userUpdateData.attributes.diaChi,
                    gioiTinh: userUpdateData.attributes.gioiTinh ? true : false,
                    ngaySinh: userUpdateData.attributes.ngaySinh ? dayjs(userUpdateData.attributes.ngaySinh) : null
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Họ và tên"
                    name="ten"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!' }]}
                >
                    <Input placeholder='Họ và tên' />
                </Form.Item>

                <Form.Item
                    label="Điện thoại"
                    name="sdt"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' },
                    {
                        pattern: /^\d{10}$/,
                        message: "Phải là số và có 10 chữ số!",
                    }]}
                >
                    <Input placeholder='Số điện thoại' />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="diachi"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}
                >
                    <TextArea rows={4} placeholder='Địa chỉ' />
                </Form.Item>

                <Form.Item
                    label="Giới tính"
                    name="gioiTinh"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính của bạn' }]}
                >
                    <Select
                        placeholder="Chọn giới tính"
                        defaultValue={userUpdateData.attributes.gioiTinh ? true : false}
                    >
                        <Option value={true}>Nam</Option>
                        <Option value={false}>Nữ</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Ngày Sinh" name="ngaySinh" >
                    <DatePicker placeholder='Chọn ngày' format={dateFormat} />
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