import React from 'react';
import { EditOutlined, ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
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
    const [messageApi, contextHolder] = message.useMessage();
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
                messageApi.open({
                    type: 'success',
                    content: 'Thêm vào giỏ hàng thành công',
                });
            }
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 400) {
                    messageApi.open({
                        type: 'error',
                        content: error.response.data.error.message,
                    });
                }
                if (error.response.status === 404) {
                    messageApi.open({
                        type: 'error',
                        content: error.response.data.error.message,
                    });
                }
                if (error.response.status === 500) {
                    messageApi.open({
                        type: 'error',
                        content: error.response.data.error.message,
                    });
                }
            }
        }
    }

    return (
        <>
            {contextHolder}
            <Card
                style={{ maxWidth: 300 }}
                cover={
                    <img
                        alt="example"
                        src={props.image}
                        className='object-cover h-48'
                    />
                }
                actions={[
                    <ShoppingCartOutlined key="cart" onClick={handleAddToCart} />,
                    <Link href={"/detail-product"}>
                        <ArrowRightOutlined key="arrow" />,
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