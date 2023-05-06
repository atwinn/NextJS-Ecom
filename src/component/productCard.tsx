import React from 'react';
import { ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import formatMoney from './formatMoney';

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

    const handleAddToCart = async () => {
        const data = {
            soLuongSP: 1,
            product: prodId,
            user_id: userId,
        }
        try {
            const res = await axios.post("/api/addtocart", data)
            if (res.status === 200) {
                message.success('Thêm vào giỏ hàng thành công')
            }
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
        }
    }

    return (
        <>
            <Card
                style={{ width: 300 }}
                hoverable
                cover={
                    <img
                        alt="example"
                        src={props.image}
                        className='h-48 object-cover'
                    />
                }
                actions={[
                    <ShoppingCartOutlined key="cart" onClick={handleAddToCart} />,
                    <Link href={`/sanpham/${props.id}`}>
                        <ArrowRightOutlined key="arrow" className='text-lg' />,
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