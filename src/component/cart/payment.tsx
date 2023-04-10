import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    InputNumber,
} from 'antd';

const { TextArea } = Input;

const Payment = () => {
    return (
        <div className='bg-white rounded-md p-5'>
            <div className='text-black font-bold text-xl mb-5'>Nhập thông tin mua hàng</div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Họ và Tên">
                    <Input />
                </Form.Item>
                <Form.Item label="Số điện thoại" >
                    <InputNumber className='w-full' />
                </Form.Item>
                <Form.Item label="Địa chỉ">
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </div>
    )
}

export default Payment