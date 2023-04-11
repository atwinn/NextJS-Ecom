import React from 'react'
import UserCard from '@/component/user-information/userCard'
import UserOrder from '@/component/user-information/userOrder'

const UserPage = () => {
    return (
        <div className='p-5 space-y-2 flex flex-col items-center'>
            <UserCard />
            <UserOrder />
        </div>
    )
}

export default UserPage