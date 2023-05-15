import CartTable from '@/component/cart/table'
import PrivatePage from '@/redux/constant/privatepage'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const Giohang = () => {
    return (
        <PrivatePage>
            <div className='p-5'>
                <CartTable />
                <Link href={"/payment"}>
                    <Button type='primary' size='large' className='mt-5 float-right'>Tiến đến thanh toán</Button>
                </Link>
            </div>
        </PrivatePage>
    )
}

export default Giohang
