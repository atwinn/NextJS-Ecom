import React from 'react';
import { ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, message, Tooltip } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import formatMoney from './formatMoney';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchCart } from '@/redux/cartSlice';

const { Meta } = Card;
interface ProductData {
    image: string,
    name: string,
    price: string,
    id: number
}

const ProdCard = (props: ProductData) => {
    const prodId = props.id
    const userId = typeof window != 'undefined' ? localStorage.getItem("id") : null
    const dispatch = useDispatch<AppDispatch>()

    const handleAddToCart = async () => {
        const data = {
            soLuongSP: 1,
            product: prodId,
            user_id: userId,
        }
        try {
            await axios.post("/api/addtocart", data)
            message.success('Thêm vào giỏ hàng thành công')
            dispatch(fetchCart(userId))
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
        }
    }

    return (
        <>
            <Card
                style={{ width: "100%" }}
                className="drop-shadow-md"
                hoverable
                cover={
                    <img
                        height={198}
                        alt="example"
                        src={props.image}
                        className='h-48 object-cover object-center '
                    />
                }
                actions={[
                    <Tooltip title="Thêm vào giỏ hàng">
                        <ShoppingCartOutlined key="cart" onClick={handleAddToCart} />
                    </Tooltip>,
                    <Link href={`/sanpham/${props.id}`}>
                        <Tooltip title="Xem sản phẩm">
                            <ArrowRightOutlined key="arrow" className='text-lg' />
                        </Tooltip>,
                    </Link>
                ]}
            >
                <Meta
                    title={props.name}
                    description={formatMoney(props.price)}
                />
            </Card>
        </>
    );
}
export default ProdCard;