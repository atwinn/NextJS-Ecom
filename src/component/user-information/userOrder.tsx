import React from 'react'
import { Card, Typography, Row, Col, Button, Space, Modal } from 'antd';
import Divider1 from '../devider';
import Link from 'next/link';
import formatMoney from '../formatMoney';
const { Title, Text } = Typography;

const UserOrder = ({ data, fetchData }: any) => {
    return (
        <Card hoverable size='small' className='lg:w-[700px] sm:w-[500px] xs:w-full cursor-default'>
            <Title level={4}>Đơn hàng số {data.id}</Title>
            <Divider1></Divider1>
            {data.ctPXs.map((item: any) => (
                <Link href={"/sanpham"}>
                    <div className='flex justify-start space-x-2 mb-2 cursor-pointer'>
                        <div>
                            <img
                                src={"https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"}
                                alt=""
                                className='rounded-md object-fill w-12 h-12'
                            />
                        </div>
                        <div className=''>
                            <div className='text-black text-lg'>{item.product.tenSP}</div>
                            <div className='text-gray-500 text-md'>Số lượng: {item.soLuong}</div>
                        </div>
                    </div>
                </Link>
            ))}
            <Divider1></Divider1>
            <div className='flex justify-between'>
                <div className='text-black text-lg font-semibold'>Tổng tiền:<span className='text-rose-500 ml-2 font-medium'> {formatMoney(data.tongTien)} </span></div>
                <div className='flex justify-end space-x-2'>
                    <Button type='primary'>Liên hệ</Button>
                    <Button danger>Hủy đơn hàng</Button>
                </div>
            </div>
        </Card>
    )
}

export default UserOrder