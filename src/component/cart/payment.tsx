import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Button, message, Modal, notification } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Link from 'next/link';
const CLIENT_ID = "ATaOhULP-j3qS5A6R-J8ZUwLgoRhLDM5dL05X7eYcannZ0SEQrOeGTPouc71Wt5fWVJk45d7FrKmR2oJ"
const { TextArea } = Input;

const Payment = ({ userId, cart, tongTien }: any) => {
    const [form] = Form.useForm()
    const [show, setShow] = useState(false)
    let money = Math.ceil(tongTien / 23622)
    const router = useRouter()
    const onFinish = async (values: any) => {
        const data = {
            user_id: userId,
            status: 0,
            sdt: values.sdt,
            diaChi: values.diaChi,
            pt_ThanhToan: "COD"
        }
        try {
            await axios.post("/api/order", data)
            notification.success({
                message: 'Thành công',
                description:
                    'Đặt hàng thành công vui lòng kiểm tra đơn hàng trong trang cá nhân',
                placement: 'topRight',
                btn: <Button type='primary' onClick={() => router.push("/userinformation")}>Đi đến trang cá nhân</Button>
            });
            router.push("/")
        } catch (error: any) {
            if (typeof error.response !== 'undefined')
                message.error(error.response.data.error.message);
        }
    }

    const handlOpenPaypal = async () => {
        try {
            await form.validateFields()
            setShow(true);
        } catch (error) {
            message.error("Vui lòng nhập đầy đủ thông tin trước khi thanh toán Paypal!")
        }
    }

    const onApprove = async (details: any, data: any) => {
        const values = await form.getFieldsValue()
        const order_data = {
            user_id: userId,
            status: 1,
            sdt: values.sdt,
            diaChi: values.diaChi,
            pt_ThanhToan: "Paypal"
        }
        try {
            await axios.post("/api/order", order_data)
            notification.success({
                message: 'Thành công',
                description:
                    'Đặt hàng và thanh toán Paypal thành công vui lòng kiểm tra đơn hàng trong trang cá nhân',
                placement: 'topRight',
                btn: <Button type='primary' onClick={() => router.push("/userinformation")}>Đi đến trang cá nhân</Button>
            });
            router.push("/")
        } catch (error: any) {
            if (typeof error.response !== 'undefined')
                message.error(error.response.data.error.message);
        }
    };
    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: money,
                    },
                },
            ],
        });
    }

    return (
        <div className='bg-white rounded-md p-5'>
            <div className='text-black font-bold text-xl mb-5'>Nhập thông tin mua hàng</div>
            <Form
                form={form}
                labelCol={{ xs: 4, lg: 8, xl: 6 }}
                wrapperCol={{ xs: 20, lg: 19, xl: 16 }}
                layout="horizontal"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="Số điện thoại"
                    name="sdt"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' },
                    {
                        pattern: /^\d{10}$/,
                        message: "Phải là số và có 10 chữ số!",
                    }]}
                    hasFeedback
                >
                    <Input className='w-full' allowClear />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="diaChi"
                    rules={[{ required: true, message: 'Vui lòng nhập số địa chỉ' }]}
                    hasFeedback
                >
                    <TextArea rows={4} allowClear />
                </Form.Item><div className="flex justify-center gap-2">
                    <Form.Item>
                        <Button type="primary" htmlType='submit' disabled={cart && cart.length !== 0 ? false : true}>Thanh toán COD</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button danger disabled={cart && cart.length !== 0 ? false : true} onClick={handlOpenPaypal}>Thanh toán Paypal</Button>
                    </Form.Item>
                </div>
            </Form>

            <Modal title={"Paypal"} footer={false} open={show} onCancel={() => setShow(false)} centered>
                <PayPalScriptProvider
                    options={{
                        "client-id": CLIENT_ID,
                    }}
                >
                    <PayPalButtons
                        disabled={cart && cart.length !== 0 ? false : true}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </PayPalScriptProvider>
            </Modal>
        </div>
    )
}

export default Payment