import { fetchCategory } from '@/redux/categorySlice'
import { AppDispatch } from '@/redux/store'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const AddCate = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const onFinish = async (values: any) => {
        const data = {
            data: {
                tenLoai: values.tenLoai,
            }
        }
        setLoading(true)
        try {
            await axios.post("/api/loaisps", data)
            message.success("Thêm loại sản phẩm thành công")
            dispatch(fetchCategory())
            setLoading(false)
            form.resetFields()
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
            setLoading(false)
        }
    }
    return (
        <Form form={form}
            name="addCate"
            onFinish={onFinish}
            autoComplete="off"
            layout='inline'
        >
            <Form.Item
                name="tenLoai"
                rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}
            >
                <Input size='large' placeholder='Tên loại sản phẩm' allowClear />
            </Form.Item>
            <Form.Item>
                <Button size='large' type="primary" htmlType="submit" loading={loading}>
                    Thêm
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddCate