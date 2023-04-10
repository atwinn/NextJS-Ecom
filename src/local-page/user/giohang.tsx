import CartTable from '@/component/cart/table'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const Giohang = () => {
    return (
        <div className='p-5'>
            <CartTable />
            <Link href={"/payment"}>
                <Button type='primary' size='large' className='mt-5 float-right'>Tiến đến thanh toán</Button>
            </Link>
        </div>
    )
}

export default Giohang
