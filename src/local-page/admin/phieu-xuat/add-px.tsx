import React, { useState, useEffect } from 'react';
import { Input, Col, Row, Select, Button, AutoComplete, Form } from 'antd';
import type { SelectProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, selectProduct } from '@/redux/productSlice';
import { AppDispatch } from '@/redux/store';
import formatMoney from '@/component/formatMoney';
import axios from 'axios';

export default function AddPX() {
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [nvId, setNvId] = useState<string | null>("")
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatch = useDispatch<AppDispatch>()
    const product = useSelector(selectProduct)

    useEffect(() => {
        setNvId(localStorage.getItem("id"))
        dispatch(fetchProduct())
    }, [dispatch])


    const productOptions = product?.data?.map((item: any) => ({
        value: item.attributes.tenSP,
        id: item.id,
        label: `${item.attributes.tenSP} - ${formatMoney(item.attributes.gia)}`,
    }))

    const onSelect = (id: number) => {
        console.log(id);
    };

    const onFinish = async (values: any) => {
        try {
            const res = await axios.get("/api/addpx")
            console.log(res);

        } catch (error) {

        }
        setDisabled((prev) => !prev)
    }

    const submitCtPx = (values: any) => {
        setDisabled((prev) => !prev)
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
                                    <Input size='large' placeholder='Tên khách hàng' allowClear />
                                </Form.Item>
                            </Col>
                            <Col xl={7} md={6} xs={12}>
                                <Form.Item
                                    name="diaChi"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                >
                                    <Input size='large' placeholder='Địa chỉ mua hàng' allowClear />
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
                                    <Input size='large' placeholder='Số điện thoại' allowClear />
                                </Form.Item>
                            </Col>
                            <Col xl={4} md={6} xs={12}>
                                <Form.Item>
                                    <Button size='large' type="primary" htmlType="submit" target='addPxForm' style={{ width: '100%' }}>
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
                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' }]}
                                >
                                    <AutoComplete
                                        disabled={disabled}
                                        options={productOptions}
                                        size='large'
                                        onSelect={(value, option) => onSelect(option.id)}
                                        placeholder="Tìm sản phẩm"
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
                                    <Input disabled={disabled} size='large' placeholder='Số lượng' allowClear />
                                </Form.Item>
                            </Col>
                            <Col xl={6} md={8} xs={12}>
                                <Form.Item>
                                    <Button disabled={disabled} size='large' type="primary" htmlType="submit" target='addCTPX' style={{ width: '100%' }}>
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