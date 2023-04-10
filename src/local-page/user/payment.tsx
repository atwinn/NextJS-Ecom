import React from 'react'
import Payment from '@/component/cart/payment'
import { Col, Row } from 'antd'
import Tamtinh from '@/component/cart/tamtinh'

const PaymentPage = () => {
    return (
        <div className='p-5'>
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Payment />
                </Col>
                <Col span={8}>
                    <Tamtinh />
                </Col>
            </Row>
        </div>
    )
}

export default PaymentPage