import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table, Space, Tooltip, Tag, Modal, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { fetchProduct, searchProd, selectProduct, selectProductStatus, updateProd } from '@/redux/productSlice';
import { EditOutlined } from "@ant-design/icons";
import formatMoney from '../formatMoney';
import UpdateProdForm from '@/local-page/admin/product-manage/update-prod';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    ten: string;
    gia: number;
    soLuong: number;
}



const ProdTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const product = useSelector(selectProduct)
    const status = useSelector(selectProductStatus)
    const [modalOpen, setModalOpen] = useState(false);
    const [show, setShow] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const handleClose = () => setModalOpen(false)
    useEffect(() => {
        if (searchParams.has("search") && searchParams.get("search") !== "") {
            const searchQuery = searchParams.get("search")
            axios.get(`/api/products/tim-kiem?key=${searchQuery}`).then(res => {
                dispatch(searchProd(res.data))
                setShow(true)
            })
        } else if (searchParams.get("search") === "") {
            dispatch(fetchProduct())
            setShow(false)
        }
    }, [searchParams])

    const columns: ColumnsType<DataType> = [
        {
            dataIndex: 'hinh',
            render: (record) => <Image src={record} alt="" className='object-cover' width={48} height={48} />,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'ten',
            sorter: (a, b) => a.ten.length - b.ten.length,
        },
        {
            title: 'Giá',
            dataIndex: 'gia',
            render: (text) => <div>{formatMoney(text)}</div>,
            sorter: (a, b) => a.gia - b.gia,
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            sorter: (a, b) => a.soLuong - b.soLuong,
        },
        {
            title: 'Loại',
            render: (record) =>
                <Tag color="volcano" key={show ? record.loai.id : record.loai.id}>{show ? record.loai.tenLoai : record.loai.attributes.tenLoai}</Tag>
        },
        {
            title: 'NCC/NSX',
            render: (record) =>
                <>
                    <Tag color="green" key={show ? record.ncc.id : record.ncc}>{show ? record.ncc.tenNCC : record.ncc?.attributes?.tenNCC}</Tag>
                    <Tag color="geekblue" key={show ? record.nsx.id : record.nsx}>{show ? record.nsx.tenNSX : record.nsx?.attributes?.tenNSX}</Tag>
                </>
        },
        {
            title: 'Bảo hành',
            dataIndex: 'baoHanh',
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record: any) => {
                let id = record.id;
                const dispatch = useDispatch<AppDispatch>();
                const handleOpen = (values: any) => {
                    dispatch(updateProd(values))
                    setModalOpen(true)
                }
                return (
                    <>
                        <Space wrap>
                            <Tooltip title={"Sửa sản phẩm"}>
                                <Button
                                    onClick={() => handleOpen(record)}
                                    className="flex justify-center items-center"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                />
                            </Tooltip>
                        </Space>
                    </>
                );
            },
        },
    ];

    let tableData = !show
        ? product.data?.map((item: any) => (
            {
                id: item.id,
                hinh: item.attributes.hinh.data
                    ? item.attributes.hinh.data?.attributes.url
                    : "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                ten: item.attributes.tenSP,
                soLuong: item.attributes.soLuongSP,
                gia: item.attributes.gia,
                loai: item.attributes.maLoai.data
                    ? item.attributes.maLoai.data
                    : "Loại",
                baoHanh: item.attributes.baoHanh,
                ncc: item.attributes.maNCC.data
                    ? item.attributes.maNCC.data
                    : "NCC",
                nsx: item.attributes.maNSX.data
                    ? item.attributes.maNSX.data
                    : "NSX",
                moTa: item.attributes.moTa,
                ctSanPham: item.attributes.ctSanPham,
            }
        ))
        : product.map((item: any) => (
            {
                id: item.id,
                hinh: item.hinh
                    ? item.hinh.url
                    : "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                ten: item.tenSP,
                soLuong: item.soLuongSP,
                gia: item.gia,
                loai: item.maLoai
                    ? item.maLoai
                    : "Loại",
                baoHanh: item.baoHanh,
                ncc: item.maNCC
                    ? item.maNCC
                    : "NCC",
                nsx: item.maNSX
                    ? item.maNSX
                    : "NSX",
                moTa: item.moTa,
                ctSanPham: item.ctSanPham,
            }
        ))

    return (
        <div>
            <Modal
                title="Sửa sản phẩm"
                centered
                open={modalOpen}
                onCancel={handleClose}
                footer={false}
                width={850}
            >
                <UpdateProdForm close={handleClose} />
            </Modal>
            <Table
                loading={status === "loading" ? true : false}
                columns={columns}
                dataSource={tableData}
                scroll={{ x: true }}
            />
        </div>
    );
};

export default ProdTable;