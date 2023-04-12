import React, { useEffect, useState } from 'react'
import UserCard from '@/component/user-information/userCard'
import UserOrder from '@/component/user-information/userOrder'
import axios from 'axios'

const UserPage = () => {
    const [userData, setUserData] = useState()
    useEffect(() => {

        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("id")
                if (userId) {
                    const res = await axios.get(`/api/users/${userId}`)
                    console.log(res);

                    setUserData(res.data.data)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData()
    }, [])
    return (
        <div className='p-5 space-y-2 flex flex-col items-center'>
            <UserCard data={userData} />
            <UserOrder />
        </div>
    )
}

export default UserPage