import React from 'react';
import { Card, Typography, Row, Col, Button, InputNumber } from 'antd';

const { Title, Text } = Typography;

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    comments: Comment[];
}

interface Comment {
    id: number;
    content: string;
    author: string;
    avatarUrl: string;
}

interface ProductProps {
    product: Product;
}

const DetailProductCard: React.FC = ({ }) => {
    const onChange = (value: number) => {
        console.log('changed', value);
    };
    return (
        <Card className='m-5'>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8} lg={6}>
                    <img
                        src={"https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"}
                        alt=""
                        style={{ maxWidth: '100%' }}
                        className='rounded-md'
                    />
                </Col>
                <Col xs={24} md={16} lg={18}>
                    <div className='flex flex-col h-full justify-between'>
                        <div>
                            <Title level={2}>Acer Nitro 5 2023</Title>
                            <div className='text-black text-xl mb-2'>Đây là giới thiệu sản phẩm</div>
                            <div className='text-black text-xl mb-2'>Giá: 2000$</div>
                        </div>
                        <div>
                            <div className='mb-2'>
                                <InputNumber min={1} max={10} defaultValue={3} />
                            </div>
                            <Button type="primary" size='large'>Thêm vào giỏ hàng</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default DetailProductCard;