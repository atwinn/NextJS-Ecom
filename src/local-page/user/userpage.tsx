import React, { useEffect, useState } from 'react'
import UserCard from '@/component/user-information/userCard'
import UserOrder from '@/component/user-information/userOrder'
import axios from 'axios'
import { message, Row, Col } from 'antd'

const UserPage = () => {
    const [userData, setUserData] = useState()
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
                if (error.response.status === 400) {
                    messageApi.open({
                        type: 'error',
                        content: error.response.data.error.message,
                    });
                }
                if (error.response.status === 500) {
                    messageApi.open({
                        type: 'error',
                        content: error.response.data.error.message,
                    });
                }
            }
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {contextHolder}
            <div className='p-5'>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={10} lg={8}>
                        <UserCard data={userData} />
                    </Col>
                    <Col xs={24} md={14} lg={16}>
                        <UserOrder />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default UserPage