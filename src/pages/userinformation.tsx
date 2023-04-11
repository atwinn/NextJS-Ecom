import { UserLayoutManager } from '@/layout/layoutUser';
import UserPage from '@/local-page/user/userpage';
import React from 'react'

const UserInformation = () => {
    return (
        <div>
            <UserPage />
        </div>
    )
}

export default UserInformation
UserInformation.PageLayout = UserLayoutManager;
