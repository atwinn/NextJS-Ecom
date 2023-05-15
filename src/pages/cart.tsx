import React from 'react'
import { UserLayoutManager } from '@/layout/layoutUser'
import Giohang from '@/local-page/user/giohang'

const Cart = () => {
    return (
        <div>
            <Giohang />
        </div>
    )
}

export default Cart
Cart.PageLayout = UserLayoutManager;