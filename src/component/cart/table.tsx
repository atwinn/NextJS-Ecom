import React, { useEffect, useState } from 'react';
import { Space, Table, message, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import formatMoney from '../formatMoney';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchCart, selectCart, selectCartStatus } from '@/redux/cartSlice';
import { useSelector } from 'react-redux';

interface Table {
    id?: number,
    key: number,
    product: {
        gia: string,
        id?: number,
        tenSP: string,
    }
    soLuongSP: string,
}

interface DataType {
    key: number,
    id: number,
    tenSP: string,
    soLuong: string,
    price: string
}

const CartTable = () => {
    const userId = typeof window != 'undefined' ? localStorage.getItem("id") : null
    const dispatch = useDispatch<AppDispatch>()
    const cartData = useSelector(selectCart)
    const status = useSelector(selectCartStatus)
    console.log(cartData);

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'tenSP',
            key: 1,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 2,
            render: (quantity, record) =>
                <InputNumber
                    value={quantity}
                    onChange={(value) => handleQuantityChange(value, record)}
                    min={1}
                    max={5}
                />,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 3,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <a onClick={() => deleteCartProd(record.id)}>Xóa sản phẩm</a>
            ),
        },
    ];

    const data = cartData.length > 0
        ? cartData.map((item: any) => {
            return {
                key: item.id,
                id: item.product.id,
                tenSP: item.product.tenSP,
                soLuong: item.soLuongSP,
                price: formatMoney(item.product.gia),
            }
        })
        : null

    const deleteCartProd = async (id: number) => {
        try {
            const res = await axios.delete(`/api/deletecart?user_id=${userId}&id_product=${id}`)
            message.success("Xóa sản phẩm khỏi giỏ hàng thành công");
            dispatch(fetchCart(userId))
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
        }
    }

    const handleQuantityChange = async (value: number | undefined, record: DataType) => {
        try {
            if (value !== null) {
                await axios.put(`/api/updatecart?user_id=${userId}&id_product=${record.id}&soLuongSP=${value}`)
                message.success("Cập nhật số lượng sản phẩm thành công");
                dispatch(fetchCart(userId))
            }
        } catch (error: any) {
            if (typeof error.response !== 'undefined')
                message.error(error.response.data.error.message);
        }
    }
    return (
        <>
            <Table columns={columns} dataSource={data} scroll={{ x: true }} />
        </>
    )
}

export default CartTable;