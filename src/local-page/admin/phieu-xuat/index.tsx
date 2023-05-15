import React from 'react'
import OrderTab from '../../../component/order/tabs';
import AddPX from './add-px';
import Divider1 from '@/component/devider';
import { getCookie } from '../../../../cookies';

const PhieuXuat = () => {
    const role = typeof window !== "undefined" ? getCookie("role") : null

    return (
        <div className='p-5'>
            {role === "4"
                ? <div className='bg-white rounded-xl border-b-2 p-5'>
                    <h1 className='text-black text-4xl font-semibold'>Quản Lý Phiếu Xuất</h1>
                    <AddPX />
                </div>
                : null}
            <Divider1 name='Quản lý phiếu xuất' />
            <OrderTab />
        </div>

    )
}

export default PhieuXuat