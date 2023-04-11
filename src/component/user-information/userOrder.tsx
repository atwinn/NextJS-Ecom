import React from 'react'
import { Card, Typography, Row, Col, Button, Space, Modal } from 'antd';
import Divider1 from '../devider';
import Link from 'next/link';
const { Title, Text } = Typography;

const UserOrder = () => {
    return (
        <div className='space-y-2'>
            <Card hoverable size='small' className='lg:w-[700px] sm:w-[500px] xs:w-full cursor-default'>
                <Title level={3}>Đơn hàng số 4</Title>
                <Link href={"/sanpham"}>
                    <div className='flex justify-start space-x-2 mb-2 cursor-pointer'>
                        <div>
                            <img
                                src={"https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"}
                                alt=""
                                className='rounded-md object-fill w-24 h-24'
                            />
                        </div>
                        <div className=''>
                            <div className='text-black text-lg'>COMBO Bánh Tráng Phơi Sương 500g </div>
                            <div className='text-gray-500 text-md'>Số lượng: 1</div>
                        </div>
                    </div>
                </Link>
                <Divider1></Divider1>
                <div className='flex justify-between'>
                    <div className='text-black text-lg font-semibold'>Tổng tiền:<span className='text-rose-500 ml-2 font-medium'> 100000$</span></div>
                    <div className='flex justify-end space-x-2'>
                        <Button type='primary'>Liên hệ</Button>
                        <Button type='primary' danger>Hủy đơn hàng</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default UserOrder