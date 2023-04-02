import React from 'react';
import { LayoutManager } from '@/layout/layoutAdmin';
import OrderTab from '../../../component/order/tabs';

export default function OrderManage() {
    return (
        <>
            <div className='p-5'>
                <h1 className='text-black text-4xl font-semibold'>Order Details</h1>
                <OrderTab />
            </div>
        </>
    )
}
OrderManage.PageLayout = LayoutManager