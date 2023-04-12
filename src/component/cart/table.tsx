import React, { useEffect, useState } from 'react';
import { Space, Table, message, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

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
    const [cartData, setCartData] = useState<Table[]>([])
    const userId = typeof window != 'undefined' ? localStorage.getItem("id") : null
    const [messageApi, contextHolder] = message.useMessage();
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

    const data: DataType[] = cartData.map((item, index) => {
        return {
            key: index + 1,
            id: item.product.id !== undefined ? item.product.id : 0,
            tenSP: item.product.tenSP,
            soLuong: item.soLuongSP,
            price: item.product.gia,
        };
    })

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/dscart?user_id=${userId}`)
            setCartData(res.data.dscart)
            console.log(res);
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 400) {
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

    useEffect(() => {
        fetchData()
    }, [])

    const deleteCartProd = async (id: number) => {
        try {
            const res = await axios.delete(`/api/deletecart?user_id=${userId}&id_product=${id}`)
            if (res.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: "Xóa sản phẩm khỏi giỏ hàng thành công",
                });
                fetchData()
            }
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 400) {
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

    const handleQuantityChange = async (value: number | undefined, record: DataType) => {
        // Gọi API để cập nhật số lượng trong database
        try {
            const res = await axios.put(`/api/updatecart?user_id=${userId}&id_product=${record.id}&soLuongSP=${value}`)
            if (res.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: "Cập nhật số lượng sản phẩm thành công",
                });
                fetchData()
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
            <Table columns={columns} dataSource={data} />
        </>
    )
}

export default CartTable;