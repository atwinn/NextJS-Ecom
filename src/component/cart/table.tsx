import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface Table {
    id?: number,
    product: {
        gia: string,
        id?: number,
        tenSP: string,
    }
    soLuongSP: string,
}

interface DataType {
    key: number,
    tenSP: string,
    soLuong: string,
    price: string
}

const CartTable = () => {
    const [cartData, setCartData] = useState<Table[]>([])
    const userId = typeof window != 'undefined' ? localStorage.getItem("id") : null
    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'tenSP',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Xóa sản phẩm</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = cartData.map((item, index) => {
        return {
            key: index + 1,
            tenSP: item.product.tenSP,
            soLuong: item.soLuongSP,
            price: item.product.gia,
        };
    })

    useEffect(() => {
        try {
            axios.get(`/api/dscart?id_kh=${userId}`).then(res => {
                setCartData(res.data)
                console.log(res);
            })
        } catch (error) {

        }
    }, [])

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default CartTable;