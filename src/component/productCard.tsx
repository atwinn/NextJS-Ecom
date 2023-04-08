import React from 'react';
import { EditOutlined, ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import axios from 'axios';

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
    const handleAddToCart = () => {
        const data = {
            soLuongSP: 1,
            product: prodId,
            khach_hang: userId
        }
        axios.post("/api/addtocart", data).then(res => {
            messageApi.open({
                type: 'success',
                content: 'Thêm vào giỏ hàng thành công',
            });
        })
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
                    />
                }
                actions={[
                    <ShoppingCartOutlined key="cart" onClick={handleAddToCart} />,
                    <ArrowRightOutlined key="arrow" />,
                ]}
            >
                <Meta
                    title={props.name}
                    description={props.price}
                />
            </Card>
        </>
    );
}
export default ProdCard;