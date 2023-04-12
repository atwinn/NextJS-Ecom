import React, { useEffect, useState } from 'react'
import UserCard from '@/component/user-information/userCard'
import UserOrder from '@/component/user-information/userOrder'
import axios from 'axios'
import { message } from 'antd'

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
            <div className='p-5 space-y-2 flex flex-col items-center'>
                <UserCard data={userData} />
                <UserOrder />
            </div>
        </>
    )
}

export default UserPage