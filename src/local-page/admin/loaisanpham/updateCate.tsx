import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchCategory } from '@/redux/categorySlice'
import { AppDispatch } from '@/redux/store'

const UpdateCate = ({ close }: any) => {
    const [form] = Form.useForm()
    const { categoryId } = useSelector((store: any) => store.category)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (categoryId) {
            form.setFieldsValue({
                tenLoai: categoryId.tenLoai,
            });
        }
    }, [categoryId, form])

    const onFinish = async (values: any) => {
        const data = {
            data: {
                tenLoai: values.tenLoai,
            }
        }
        if (categoryId.tenLoai === values.tenLoai) {
            message.warning("Hãy chỉnh sửa trước khi lưu")
        }
        else {
            setLoading(true)
            try {
                await axios.put(`/api/loaisps/${categoryId.key}`, data)
                message.success("Sửa loại sản phẩm thành công")
                dispatch(fetchCategory())
                setLoading(false)
                close()
            } catch (error: any) {
                setLoading(false)
                if (typeof error.response !== 'undefined') {
                    message.error(error.response.data.error.message)
                }
            }
        }
    }
    return (
        <Form form={form}
            name="updateCate"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="tenLoai"
                rules={[{ required: true, message: 'Vui lòng nhập tên loại!' }]}
            >
                <Input placeholder='Tên loại sản phẩm' allowClear />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Lưu thay đổi
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UpdateCate