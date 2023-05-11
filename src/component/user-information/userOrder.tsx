import React, { useState } from 'react'
import { Card, Typography, Button, Steps, message } from 'antd';
import Divider1 from '../devider';
import Link from 'next/link';
import formatMoney from '../formatMoney';
import { pageRoutes } from '@/redux/constant/page-routes.constant';
import axios from 'axios';
import Popconfirm from 'antd/lib/popconfirm';
const { Title, Text } = Typography;

const UserOrder = ({ data, fetchData }: any) => {
    const [loading, setLoading] = useState<boolean>(false)

    const cancelOrder = async () => {
        const data1 = {
            user_id_kh: localStorage.getItem("id"),
            id_px: data.id,
        }
        setLoading(true)
        try {
            const source = axios.CancelToken.source()
            const timeout = setTimeout(() => {
                source.cancel("Request timeout")
                message.warning("Hết thời gian vui lòng thử lại!")
                setLoading(false);
            }, 5000);
            await axios.put("/api/huyDH", data1, {
                cancelToken: source.token
            })
            clearTimeout(timeout)
            message.success("Hủy đơn hàng thành công")
            fetchData()
            setLoading(false)
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 405)
                    message.error(error.response.data)
                message.error(error.response.data.error.message)
            }
            setLoading(false)
        }
    }
    return (
        <Card hoverable size='small' className='lg:w-[700px] sm:w-[500px] xs:w-full cursor-default'>
            <Title level={4}>Đơn hàng số {data.id}</Title>
            <Divider1></Divider1>
            <Steps
                className='px-5'
                current={data.status === 2 ? 1 : data.status}
                status={data.status === 0 ? 'process' : data.status === 1 ? 'finish' : 'error'}
                items={[
                    {
                        title: 'Chưa xác nhận',
                    },
                    {
                        title: data.status === 2 ? 'Đã hủy đơn' : 'Đã xác nhận',
                    },
                ]}
            />
            <Divider1></Divider1>
            {data.ctPXs.map((item: any) => (
                <Link key={item.id} href={`/sanpham/${item.product.id}`}>
                    <div className='flex justify-start space-x-2 mb-2 cursor-pointer'>
                        <div>
                            <img
                                src={item.product.hinh
                                    ? item.product.hinh.url
                                    : "https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"}
                                alt=""
                                className='rounded-md object-scale-down w-12 h-12'
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
                    <Link href={pageRoutes.contact.route} >
                        <Button type='primary'>Liên hệ</Button>
                    </Link>
                    <Popconfirm
                        onConfirm={cancelOrder}
                        title="Hủy đơn hàng"
                        description="Hủy đơn hàng sẽ không thể hoàn tác, bạn chắc chứ?"
                        okText="Chắc chắn"
                        okButtonProps={{ loading: false }}
                        cancelText="Nghĩ lại">
                        <Button danger disabled={data.status === 2 || data.status === 1 ? true : false} loading={loading}>Hủy đơn hàng</Button>
                    </Popconfirm>
                </div>
            </div>
        </Card>
    )
}

export default UserOrder