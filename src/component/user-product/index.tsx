import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Button, InputNumber, message } from 'antd';
import { useSelector } from 'react-redux';
import { fetchDetail, selectDetail, selectDetailStatus } from '@/redux/detailProdSlice';
import formatMoney from '../formatMoney';
import ShortenDes from '../shortenDescrip';
import { ShoppingOutlined } from '@ant-design/icons'
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { fetchCart } from '@/redux/cartSlice';
import Comment from './comment';
import { fetchComment, selectComment } from '@/redux/commentSlice';

const { Title } = Typography;

const DetailProductCard = () => {
    const prodDetail = useSelector(selectDetail)
    const comment = useSelector(selectComment)
    const status = useSelector(selectDetailStatus)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const userId = typeof window != 'undefined' ? localStorage.getItem("id") : null
    const [quantity, setQuantity] = useState<number>(1)
    const { id } = router.query
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (id) {
            dispatch(fetchDetail(id))
            dispatch(fetchComment(id))
        }
    }, [id])

    useEffect(() => {
        if (status === 'success') {
            setLoading(false)
        }
    }, [status, loading])

    const handleQuantityChange = (value: any) => {
        setQuantity(value)
    }

    const handleAddToCart = async () => {
        const data = {
            soLuongSP: quantity,
            product: id,
            user_id: userId,
        }
        try {
            await axios.post("/api/addtocart", data)
            message.success('Thêm vào giỏ hàng thành công')
            dispatch(fetchCart(userId))
            setQuantity(1)
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
        }
    }

    return (
        <div className='flex justify-center p-5'>
            {loading
                ? "Loading..."
                : <div style={{ width: 1100 }}>
                    <Head>
                        <title>{prodDetail.data.attributes.tenSP}</title>
                    </Head>
                    <Card>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={10}>
                                <img
                                    src={prodDetail.data.attributes.hinh.data.attributes.url}
                                    alt=""
                                    style={{ width: 300, height: 300 }}
                                    className='rounded-md object-cover'
                                />
                            </Col>
                            <Col xs={24} md={14}>
                                <div className='flex flex-col h-full justify-between gap-2'>
                                    <div>
                                        <Title level={2}>{prodDetail.data.attributes.tenSP}</Title>
                                        <div className='text-rose-600 text-lg mb-2'>{formatMoney(prodDetail.data.attributes.gia)}</div>
                                        <p>{comment.length} Bình luận</p>
                                        <div className='rounded-md p-2 bg-slate-200 max-w-[300px]'>
                                            {prodDetail.data?.attributes.ctSanPham
                                                ? <div dangerouslySetInnerHTML={{ __html: prodDetail.data.attributes.ctSanPham }} />
                                                : "Chưa có thông tin sản phẩm"}
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <InputNumber min={1} max={5} value={quantity} onChange={(value) => handleQuantityChange(value)} />
                                        {prodDetail.data.attributes.gia === "0"
                                            ? <Button type="primary" disabled size='large'><ShoppingOutlined className='text-xl' />Hết hàng</Button>
                                            : <Button type="primary" size='large' onClick={handleAddToCart}><ShoppingOutlined className='text-xl' />Thêm vào giỏ</Button>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    {prodDetail.data.attributes.moTa
                        ? <ShortenDes content={prodDetail.data.attributes.moTa} />
                        : null}
                    <Comment comment={comment} id={id} userId={userId} />
                </div>}
        </div>
    );
};

export default DetailProductCard;