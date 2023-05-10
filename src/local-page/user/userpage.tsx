import React, { useEffect, useState } from 'react'
import UserCard from '@/component/user-information/userCard'
import UserOrder from '@/component/user-information/userOrder'
import axios from 'axios'
import { message, Row, Col, Empty } from 'antd'
import PrivatePage from '@/redux/constant/privatepage'

const UserPage = () => {
    const [userData, setUserData] = useState()
    const [donHang, setDonHang] = useState<any[]>()
    const [messageApi, contextHolder] = message.useMessage();

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("id")
            if (userId) {
                const res = await axios.get(`/api/khach-hangs?filters[users_permissions_user][id][$eq]=${userId}`)
                setUserData(res.data.data)
            }
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
        }
    }

    const fetchDonHang = async () => {
        try {
            const userId = localStorage.getItem("id")
            if (userId) {
                const res = await axios.get(`/api/dsdonhang?user_id=${userId}`)
                setDonHang(res.data)
            }
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 400 || error.response.status === 403 || error.response.status === 404 || error.response.status === 500) {
                    messageApi.open({
                        type: 'error',
                        content: error.response.data.error.message,
                    });
                }
            }
        }
    }

    useEffect(() => {
        fetchData()
        fetchDonHang()
    }, [])

    return (
        <PrivatePage>
            {contextHolder}
            <div className='p-5'>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={10} lg={8}>
                        <UserCard data={userData} fectchData={fetchData} />
                    </Col>
                    <Col xs={24} md={14} lg={16}>
                        <div className='space-y-2'>
                            {donHang && donHang?.length !== 0 ? donHang.map((item: any) => (
                                <UserOrder data={item} fetchData={fetchDonHang} />
                            ))
                                : <Empty description="Chưa có gì ở đây cả" />}
                        </div>
                    </Col>
                </Row>
            </div>
        </PrivatePage>
    )
}

export default UserPage