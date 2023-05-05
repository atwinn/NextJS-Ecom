import React, { useState, useEffect } from 'react';
import { Input, Col, Row, Select, Button, AutoComplete, Form, message } from 'antd';
import type { SelectProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, selectProduct } from '@/redux/productSlice';
import { AppDispatch } from '@/redux/store';
import formatMoney from '@/component/formatMoney';
import axios from 'axios';
import { fetchPx } from '@/redux/phieuXuatSlice';

export default function AddPX() {
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [loading, setLoading] = useState<boolean[]>([]);
    const [pxId, setPxId] = useState<string | null>("")
    const [nvId, setNvId] = useState<string | null>("")
    const [prodId, setProdId] = useState<number | null>()
    const [disabled, setDisabled] = useState<boolean>(false)
    const [disabled1, setDisabled1] = useState<boolean>(true)
    const dispatch = useDispatch<AppDispatch>()
    const product = useSelector(selectProduct)

    useEffect(() => {
        setNvId(localStorage.getItem("id"))
        dispatch(fetchProduct())
    }, [])


    const productOptions = product?.data?.map((item: any) => ({
        value: item.attributes.tenSP,
        id: item.id,
        label: `${item.attributes.tenSP} - Số Lượng: ${item.attributes.soLuongSP}`,
    }))

    const onSelect = (id: number) => {
        setProdId(id)
    };

    const onFinish = async (values: any) => {
        try {
            const data = { tenKH: values.tenKH, sdt: values.sdt, diaChi: values.diaChi, pt_ThanhToan: "COD", user_id_nv: nvId, status: "0" }
            const res = await axios.post("/api/addpx", data)
            setPxId(res.data.phieuxuat.id)
            setDisabled(true)
            setDisabled1(false)
            message.success("Thêm phiếu xuất thành công")
            dispatch(fetchPx())
            form1.resetFields()
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message,)
            }
        }
    }

    const submitCtPx = async (values: any) => {
        try {
            const data = { id_px: pxId, product: prodId, soLuongSP: values.sl }
            await axios.post("/api/addctpx", data)
            setDisabled(false)
            setDisabled1(true)
            dispatch(fetchPx())
            form2.resetFields()
            message.success("Thêm chi tiết phiếu xuất thành công")
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message,)
            }
        }
    }

    return (
        <div className='pt-3'>
            <Row gutter={[16, 8]}>
                <Col xs={24} xl={12}>
                    <h3 className='text-black'>Thêm Phiếu Xuất</h3>
                    <Form form={form1}
                        name="addPxForm"
                        onFinish={onFinish}
                        autoComplete="off">
                        <Row gutter={[16, 8]}>
                            <Col xl={7} md={6} xs={12}>
                                <Form.Item
                                    name="tenKH"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                                >
                                    <Input disabled={disabled} size='large' placeholder='Tên khách hàng' allowClear />
                                </Form.Item>
                            </Col>
                            <Col xl={7} md={6} xs={12}>
                                <Form.Item
                                    name="diaChi"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                >
                                    <Input disabled={disabled} size='large' placeholder='Địa chỉ mua hàng' allowClear />
                                </Form.Item>
                            </Col>
                            <Col xl={6} md={6} xs={12}>
                                <Form.Item
                                    name="sdt"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' },
                                    {
                                        pattern: /^\d{10}$/,
                                        message: "Phải là số và có 10 chữ số!",
                                    }]}
                                    hasFeedback
                                >
                                    <Input disabled={disabled} size='large' placeholder='Số điện thoại' allowClear />
                                </Form.Item>
                            </Col>
                            <Col xl={4} md={6} xs={12}>
                                <Form.Item>
                                    <Button disabled={disabled} size='large' type="primary" htmlType="submit" target='addPxForm' style={{ width: '100%' }}>
                                        Thêm
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={24} xl={12}>
                    <h3 className='text-black'>Thêm Chi Tiết Phiếu Xuất</h3>
                    <Form form={form2}
                        name="addCTPX"
                        onFinish={submitCtPx}
                        autoComplete="off">
                        <Row gutter={[16, 8]}>
                            <Col xl={9} md={8} xs={24}>
                                <Form.Item
                                    name="tenSP"
                                    rules={[{ required: true, message: 'Vui lòng nhập sản phẩm!' }]}
                                >
                                    <AutoComplete
                                        disabled={disabled1}
                                        options={productOptions}
                                        size='large'
                                        onSelect={(value, option) => onSelect(option.id)}
                                        placeholder="Tìm sản phẩm"
                                        allowClear
                                        filterOption={(inputValue, option: any) =>
                                            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={9} md={8} xs={12}>
                                <Form.Item
                                    name="sl"
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
                                    <Input disabled={disabled1} size='large' placeholder='Số lượng' allowClear />
                                </Form.Item>
                            </Col>
                            <Col xl={6} md={8} xs={12}>
                                <Form.Item>
                                    <Button disabled={disabled1} size='large' type="primary" htmlType="submit" target='addCTPX' style={{ width: '100%' }}>
                                        Thêm Chi Tiết
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}