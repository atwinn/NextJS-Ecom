import React from 'react'
import { Button } from 'antd'

const Tamtinh = () => {
    return (
        <div className='rounded-md bg-white p-5'>
            <div className='text-black text-xl font-semibold'>
                Thông tin giỏ hàng
            </div>
            <div className="my-2 rounded-md bg-slate-300/50 p-2">
                <div className='flex justify-between'>
                    <div className="text-black text-lg">Tạm tính</div>
                    <div className="text-black text-lg">10,000</div>
                </div>
                <div className='flex justify-between'>
                    <div className="text-black text-lg">Giảm giá</div>
                    <div className="text-black text-lg">0</div>
                </div>
            </div>
            <div className='flex justify-between mb-2'>
                <div className="text-black text-xl font-semibold">Tổng tiền</div>
                <div className="text-black text-xl">0</div>
            </div>
            <Button type="primary">Thanh toán khi nhận hàng</Button>
        </div>
    )
}

export default Tamtinh