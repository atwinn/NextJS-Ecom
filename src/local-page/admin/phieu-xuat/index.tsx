import React from 'react'
import OrderTab from '../../../component/order/tabs';
import AddPX from './add-px';

const PhieuXuat = () => {
    return (
        <div className='p-5'>
            <div className='bg-white rounded-xl border-b-2 p-5'>
                <h1 className='text-black text-4xl font-semibold'>Quản Lý Phiếu Xuất</h1>
                <AddPX />
            </div>
            <OrderTab />
        </div>

    )
}

export default PhieuXuat