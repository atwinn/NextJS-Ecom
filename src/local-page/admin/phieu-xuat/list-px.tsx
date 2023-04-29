import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Input, TableColumnsType } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Tag, Space, Table, Button, Tooltip, Popconfirm, message } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { addCtPx, fetchPx, selectPX, selectPXError, selectPXStatus } from '@/redux/phieuXuatSlice';
import formatMoney from '@/component/formatMoney';
import { CloseOutlined } from '@ant-design/icons'
import axios from 'axios';

interface DataType {
    key: React.Key;
    name: string;
    platform: string;
    version: string;
    upgradeNum: number;
    creator: string;
    createdAt: string;
}

interface ExpandedDataType {
    key: React.Key;
    id: string;
    date: string;
    name: string;
    upgradeNum: string;
    sl: string
}

const ListPhieuXuat: React.FC = () => {
    const px = useSelector(selectPX)
    const pxStatus = useSelector(selectPXStatus)
    const [pxId, setPxId] = useState<number>(0)
    const dispatch = useDispatch<AppDispatch>()
    const [expandedData, setExpandedData] = useState<ExpandedDataType[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const { ctPx } = useSelector((store: any) => store.phieuxuat)
    const [loading, setLoading] = useState<boolean>(false)
    const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
    useEffect(() => {
        dispatch(fetchPx())
    }, [dispatch])

    const handleQuantityChange = (id: string, recordKey: React.Key, value: number) => {
        setEditedData(prev => ({ ...prev, [`${id}-${recordKey}`]: value }))
    }

    const handleQuantityBlur = async (id: string, recordKey: React.Key, sl: string) => {
        const newValue = editedData[`${id}-${recordKey}`]
        if (newValue !== undefined && newValue !== parseInt(sl)) {
            try {
                const data = { id_px: pxId, product: recordKey, soLuongSP: newValue }
                console.log(data);
                await axios.put("/api/updatectpx", data)
                message.success("Cập nhật số lượng sản phẩm thành công")
                dispatch(fetchPx())
            } catch (error) {
                message.error("Có lỗi xảy ra khi cập nhật số lượng sản phẩm")
                setEditedData(prev => ({ ...prev, [`${id}-${recordKey}`]: data.find((item: any) => item.key === recordKey)?.sl }));
            }
        }
    }

    const handlExpandedRow = async (record: any) => {
        setPxId(record.key)
        setLoading(true)
        try {
            const res = await axios.get(`/api/ctpxs?id_px=${record.key}`)
            dispatch(addCtPx(res.data))
            setLoading(false)
        } catch (error) {

        }
    }

    const expandedRowRender = () => {
        const columns: TableColumnsType<ExpandedDataType> = [
            { title: 'Tên Sản Phẩm', dataIndex: 'tenSP', key: 'tenSP' },
            {
                title: 'Số Lượng',
                dataIndex: 'sl',
                key: 'sl',
                width: 100,
                render: (text, record) => (
                    <Input
                        type="number"
                        value={editedData[`${record.id}-${record.key}`] ?? text}
                        onChange={e => handleQuantityChange(record.id, record.key, +e.target.value)}
                        onBlur={() => handleQuantityBlur(record.id, record.key, record.sl)}
                    />
                )
            },
            { title: 'Giá', dataIndex: 'gia', key: 'gia' },
            { title: 'Bảo Hành', dataIndex: 'BH', key: 'BH' },
            {
                title: 'Hành Động',
                dataIndex: 'operation',
                key: 'operation',
                render: () =>
                    <a>Stop</a>
            },
        ];

        let data = ctPx.map((item: any) => ({
            key: item.product.id,
            id: item.id,
            tenSP: item.product.tenSP,
            sl: item.soLuong,
            gia: item.product.gia,
            BH: item.product.baoHanh,
        }))

        return (
            <>
                <Button>Thêm sản phẩm mới</Button>
                <Table columns={columns} dataSource={data} pagination={false} loading={loading} />
            </>
        )
    };

    const checkStatus = (status: number) => {
        var statusName
        switch (status) {
            case 0:
                statusName = "Chưa xác nhận"
                break;
            case 1:
                statusName = "Đã xác nhận"
                break;
            case 2:
                statusName = "Đã hủy đơn"
                break;
            default:
                break;
        }
        return statusName
    }

    const columns: ColumnsType<DataType> = [
        { title: 'Khách Hàng', dataIndex: 'tenKH' },
        { title: 'Số Điện Thoại', dataIndex: 'sdt', render: (text) => <Tag color="geekblue" >0{text}</Tag> },
        { title: 'Địa Chi', dataIndex: 'diaChi' },
        { title: 'Thanh Toán', dataIndex: 'pttt', render: (text) => <Tag color="green" >{text}</Tag> },
        { title: 'Trạng Thái', dataIndex: 'status', render: (text) => `${checkStatus(text)}` },
        { title: 'Tổng Tiền', dataIndex: 'tongTien', render: (text) => <div>{formatMoney(text)}</div>, },
        {
            title: 'Hành Động',
            key: 'operation',
            render: (_, record: any) => {
                const confirm = async () => {
                    try {
                        const res = await axios.delete(`/api/deletepx?id_px=${record.key}`)
                        message.success("Xóa thành công")
                        dispatch(fetchPx())
                    } catch (error: any) {
                        if (typeof error.response !== 'undefined') {
                            if (error.response.status === 400
                                || error.response.status === 402
                                || error.response.status === 403
                                || error.response.status === 404
                                || error.response.status === 405
                                || error.response.status === 500) {
                                message.error(error.response.data.error.message);
                            }
                        }
                    }
                }
                return (
                    <>
                        <Space wrap>
                            <Tooltip title={"Xóa phiếu xuất"}>
                                <Popconfirm
                                    placement="top"
                                    title={"Xóa Phiếu Xuất"}
                                    description={"Hành động này không thể hoàn tác, hãy suy nghĩ kỹ"}
                                    onConfirm={confirm}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                    okType="danger"
                                >
                                    <Button
                                        className="flex justify-center items-center"
                                        shape="circle"
                                        icon={<CloseOutlined style={{ color: '#f74a4a' }} />}
                                    />
                                </Popconfirm>
                            </Tooltip>
                        </Space>
                    </>
                );
            },
        },
    ];

    let data = px?.data?.map((item: any) => (
        {
            key: item.id,
            tenKH: item.attributes.tenKH,
            sdt: item.attributes.sdt,
            diaChi: item.attributes.diaChi,
            pttt: item.attributes.pt_ThanhToan,
            status: item.attributes.status,
            tongTien: item.attributes.tongTien,
        }
    ))

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: true }}
                loading={pxStatus === "loading" ? true : false}
                expandedRowKeys={expandedRowKeys}
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => true,
                    onExpand(expanded, record: any) {
                        if (expanded) {
                            handlExpandedRow(record)
                            setExpandedRowKeys([record.key]);
                        } else {
                            setExpandedRowKeys([]);
                        }
                    },
                }}
            />
        </>
    );
};

export default ListPhieuXuat;