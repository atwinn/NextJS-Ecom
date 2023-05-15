import React, { useEffect, useState } from 'react'
import Payment from '@/component/cart/payment'
import { Col, Row, message } from 'antd'
import Tamtinh from '@/component/cart/tamtinh'
import PrivatePage from '@/redux/constant/privatepage'
import axios from 'axios'

const PaymentPage = () => {
    const [tongTien, setTongTien] = useState<any>()
    const [cart, setCart] = useState<any>()
    const userId = typeof window != 'undefined' ? localStorage.getItem("id") : null
    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/dscart?user_id=${userId}`)
            setTongTien(res.data.Tongtien)
            setCart(res.data.dscart)
        } catch (error: any) {
            if (typeof error.response !== 'undefined')
                message.error(error.response.data.error.message);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <PrivatePage>
            <div className='p-5'>
                <Row gutter={[16, 16]}>
                    <Col xs={0} lg={4}></Col>
                    <Col xs={24} lg={8}>
                        <Payment userId={userId} cart={cart} tongTien={tongTien} />
                    </Col>
                    <Col xs={24} lg={8}>
                        <Tamtinh tongTien={tongTien} />
                    </Col>
                    <Col xs={0} lg={4}></Col>
                </Row>
            </div>
        </PrivatePage>
    )

}

export default PaymentPage