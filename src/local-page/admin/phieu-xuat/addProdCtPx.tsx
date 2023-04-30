import React, { useState, useEffect } from 'react'
import { Form, Button, Input, AutoComplete, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { fetchProduct, selectProduct } from '@/redux/productSlice'
import axios from 'axios'
import { addCtPx } from '@/redux/phieuXuatSlice'

const AddProdCtPx = ({ pxId }: any) => {
    const [form] = Form.useForm()
    const [prodId, setProdId] = useState<number | null>()
    const dispatch = useDispatch<AppDispatch>()
    const product = useSelector(selectProduct)

    useEffect(() => {
        dispatch(fetchProduct())
    }, [])

    const productOptions = product?.data?.map((item: any) => ({
        value: item.attributes.tenSP,
        id: item.id,
        label: `${item.attributes.tenSP} - Số Lượng: ${item.attributes.soLuongSP}`,
    }))

    const onFinish = async (values: any) => {
        try {
            const data = { id_px: pxId, product: prodId, soLuongSP: values.sl }
            await axios.post("/api/addctpx", data)
            form.resetFields()
            message.success("Thêm sản phẩm thành công")
            const res = await axios.get(`/api/ctpxs?id_px=${pxId}`)
            dispatch(addCtPx(res.data))
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 400
                    || error.response.status === 402
                    || error.response.status === 403
                    || error.response.status === 404
                    || error.response.status === 405
                    || error.response.status === 500) {
                    message.error(error.response.data.error.message,);
                }
            }
        }
    }

    const onSelect = (id: number) => {
        setProdId(id)
    };

    return (
        <>
            <Form
                form={form}
                name="addCtPxForm"
                onFinish={onFinish}
                className='flex justify-start gap-2'
                autoComplete="off">
                <Form.Item
                    name="tenSP"
                    rules={[{ required: true, message: 'Vui lòng nhập sản phẩm!' }]}
                    hasFeedback
                >
                    <AutoComplete
                        options={productOptions}
                        onSelect={(value, option) => onSelect(option.id)}
                        placeholder="Tìm sản phẩm"
                        style={{ width: 250 }}
                        allowClear
                        filterOption={(inputValue, option: any) =>
                            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="sl"
                    hasFeedback
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' },
                    { pattern: /^\d+$/, message: "Phải là số!", },
                    {
                        validator: (_, value) => {
                            if (value >= 1 && value <= 5) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Chỉ thêm 1 đến 5 sản phẩm');
                        },
                    }]}
                >
                    <Input placeholder='Số lượng' allowClear />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">
                        Thêm sản phẩm mới
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddProdCtPx