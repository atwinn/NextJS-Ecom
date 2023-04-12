import React from 'react'
import Payment from '@/component/cart/payment'
import { Col, Row } from 'antd'
import Tamtinh from '@/component/cart/tamtinh'

const PaymentPage = () => {
    return (
        <div className='p-5'>
            <Row gutter={[16, 16]}>
                <Col xs={0} lg={4}></Col>
                <Col xs={24} lg={8}>
                    <Payment />
                </Col>
                <Col xs={24} lg={8}>
                    <Tamtinh />
                </Col>
                <Col xs={0} lg={4}></Col>
            </Row>
        </div>
    )
}

export default PaymentPage