import React from 'react';
import { EditOutlined, ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;
interface ProductData {
    image: string,
    name: string,
    price: string,
}

const ProdCard = (props: ProductData) => (
    <Card
        style={{ maxWidth: 300 }}
        cover={
            <img
                alt="example"
                src={props.image}
            />
        }
        actions={[
            <ShoppingCartOutlined key="cart" />,
            <ArrowRightOutlined key="arrow" />,
        ]}
    >
        <Meta
            title={props.name}
            description={props.price}
        />
    </Card>
);

export default ProdCard;