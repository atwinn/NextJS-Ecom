import React from 'react';
import { ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, message, notification, Tooltip } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import formatMoney from './formatMoney';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchCart } from '@/redux/cartSlice';
import { useRouter } from 'next/router';
import { getCookie } from '../../cookies';

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
    const role = typeof window != 'undefined' ? getCookie("role") : null
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const handleAddToCart = async () => {
        const data = {
            soLuongSP: 1,
            product: prodId,
            user_id: userId,
        }
        if (role === "5") {
            try {
                await axios.post("/api/addtocart", data)
                message.success('Thêm vào giỏ hàng thành công')
                dispatch(fetchCart(userId))
            } catch (error: any) {
                if (typeof error.response !== 'undefined') {
                    message.error(error.response.data.error.message)
                }
            }
        } else if (!role)
            notification.error({
                message: 'Thất bại',
                description:
                    'Vui lòng đăng nhập để mua hàng',
                placement: 'topRight',
                btn: <Button type='primary' onClick={() => router.push("/auth/login")}>Đăng nhập ngay</Button>
            });
        else {
            notification.error({
                message: 'Thất bại',
                description:
                    'Không có quyền mua hàng',
                placement: 'topRight',
            });
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