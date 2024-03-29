import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Empty, Input, TableColumnsType } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Tag, Space, Table, Button, Tooltip, Popconfirm, message, Radio, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { addCtPx, fetchPx, pxInformation, selectPX, selectPXError, selectPXStatus } from '@/redux/phieuXuatSlice';
import formatMoney from '@/component/formatMoney';
import { CloseOutlined, CheckOutlined, PushpinOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons'
import axios from 'axios';
import AddProdCtPx from './addProdCtPx';
import PrintPx from './printPx';
import { getCookie } from '../../../../cookies';
interface DataType {
    key: React.Key;
    name: string;
    platform: string;
    version: string;
    upgradeNum: number;
    creator: string;
    createdAt: string;
    status: number;
    tenKH: string;
    tongTien: number;
    pttt: string;
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
    const [show, setShow] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const { ctPx } = useSelector((store: any) => store.phieuxuat)
    const [loading, setLoading] = useState<boolean>(false)
    const [editedData, setEditedData] = useState<{ [key: string]: number }>({});
    const role = typeof window !== "undefined" ? getCookie("role") : null
    useEffect(() => {
        dispatch(fetchPx())
    }, [])

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
            } catch (error: any) {
                if (typeof error.response !== 'undefined') {
                    message.error(error.response.data.error.message,)
                }
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

    const deleteProd = async (prodId: any) => {
        try {
            await axios.delete(`/api/deletectpx?id_px=${pxId}&product=${prodId}`)
            message.success("Xóa sản phẩm thành công")
            const res = await axios.get(`/api/ctpxs?id_px=${pxId}`)
            dispatch(addCtPx(res.data))
            dispatch(fetchPx())
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message,)
            }
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
                    role === "4"
                        ? <Input
                            type="number"
                            value={editedData[`${record.id}-${record.key}`] ?? text}
                            onChange={e => handleQuantityChange(record.id, record.key, +e.target.value)}
                            onBlur={() => handleQuantityBlur(record.id, record.key, record.sl)}
                        />
                        : <p>{text}</p>
                )
            },
            { title: 'Giá', dataIndex: 'gia', render: (text) => <div>{formatMoney(text)}</div>, },
            { title: 'Bảo Hành', dataIndex: 'BH', key: 'BH' },
            {
                title: 'Thao tác',
                dataIndex: 'operation',
                key: 'operation',
                render: (_, record) =>
                    <Tooltip title={role === "4" ? "Xóa sản phẩm" : "Không có quyền thao tác"}>
                        <Popconfirm
                            placement="top"
                            title={"Xóa sản phẩm khỏi phiếu xuất"}
                            description={"Hành động này không thể hoàn tác, hãy suy nghĩ kỹ"}
                            onConfirm={() => deleteProd(record.key)}
                            okButtonProps={{ loading: false }}
                            okText="Xóa"
                            cancelText="Hủy"
                            okType="danger"
                            disabled={role === "4" ? false : true}
                        >
                            <DeleteOutlined className='cursor-pointer text-red-500' disabled={role === "4" ? false : true} />
                        </Popconfirm>
                    </Tooltip>
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
                {role === "4"
                    ? <AddProdCtPx pxId={pxId} />
                    : null}
                <Table columns={columns} dataSource={data} pagination={false} loading={loading} />
            </>
        )
    };

    const updatePxStatus = async (pxid: any, status: any) => {
        const nvId = localStorage.getItem("id")
        try {
            const data = { user_id_nv: nvId, status: status, id_px: pxid }
            await axios.put("/api/update_status", data)
            message.success("Cập nhật trạng thái thành công")
            dispatch(fetchPx())
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message,)
            }
        }
    }

    const columns: ColumnsType<DataType> = [
        { title: 'Khách Hàng', dataIndex: 'tenKH', sorter: (a, b) => a.tenKH.length - b.tenKH.length, showSorterTooltip: false },
        { title: 'Số Điện Thoại', dataIndex: 'sdt', render: (text) => <Tag color="geekblue" >0{text}</Tag> },
        { title: 'Địa Chi', dataIndex: 'diaChi' },
        { title: 'Thanh Toán', dataIndex: 'pttt', render: (text) => <Tag color="green" >{text}</Tag>, sorter: (a, b) => a.pttt.length - b.pttt.length, showSorterTooltip: false },
        {
            title: 'Trạng Thái', dataIndex: 'status', sorter: (a, b) => a.status - b.status, showSorterTooltip: false, render: (_, record) =>
                <Radio.Group value={record.status.toString()} buttonStyle="solid" size='small' style={{ minWidth: 90 }}>
                    <Tooltip title="Chưa xác nhận">
                        <Radio.Button value="0"><PushpinOutlined /></Radio.Button>
                    </Tooltip>
                    <Tooltip title="Đã xác nhận">
                        {record.status !== 0
                            ? <Radio.Button value="1"><CheckOutlined /></Radio.Button>
                            : <Popconfirm
                                placement="top"
                                title={"Đổi trạng thái"}
                                description={"Hành động này sẽ đổi trạng thái sang đã xác nhận, hãy suy nghĩ kỹ"}
                                onConfirm={() => updatePxStatus(record.key, "1")}
                                okButtonProps={{ loading: false }}
                                okText="Đổi"
                                cancelText="Hủy"
                            >
                                <Radio.Button value="1"><CheckOutlined /></Radio.Button>
                            </Popconfirm>}
                    </Tooltip>
                    <Tooltip title="Hủy đơn hàng">
                        {record.status === 0
                            ? <Popconfirm
                                placement="top"
                                title={"Đổi trạng thái"}
                                description={"Hành động này sẽ đổi trạng thái sang hủy đơn hàng, hãy suy nghĩ kỹ"}
                                onConfirm={() => updatePxStatus(record.key, "2")}
                                okButtonProps={{ loading: false }}
                                okText="Đổi"
                                cancelText="Hủy"
                                okType="danger"
                            >
                                <Radio.Button value="2"><DeleteOutlined /></Radio.Button>
                            </Popconfirm>
                            : <Radio.Button value="2"><DeleteOutlined /></Radio.Button>}
                    </Tooltip>
                </Radio.Group>
        },
        { title: 'Tổng Tiền', dataIndex: 'tongTien', render: (text) => <div>{formatMoney(text)}</div>, sorter: (a, b) => a.tongTien - b.tongTien, showSorterTooltip: false },
        {
            title: 'Thao tác',
            key: 'operation',
            render: (_, record: any) => {
                const confirm = async () => {
                    try {
                        await axios.delete(`/api/deletepx?id_px=${record.key}`)
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
                const handlePrint = async () => {
                    const res = await axios.get(`/api/ctpxs?id_px=${record.key}`)
                    dispatch(addCtPx(res.data))
                    dispatch(pxInformation(record))
                    setShow(true)
                }
                return (
                    <div className='flex justify-start gap-2'>
                        {record.status === 0
                            ? <Space wrap>
                                {role === "4"
                                    ?
                                    <Tooltip title={"Xóa phiếu xuất"}>
                                        <Popconfirm
                                            placement="top"
                                            title={"Xóa Phiếu Xuất"}
                                            description={"Hành động này không thể hoàn tác, hãy suy nghĩ kỹ"}
                                            onConfirm={confirm}
                                            okButtonProps={{ loading: false }}
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
                                    : null}
                            </Space>
                            : null}
                        <Tooltip title={"In phiếu xuất"}>
                            <Button
                                className="flex justify-center items-center"
                                shape="circle"
                                icon={<PrinterOutlined />}
                                onClick={handlePrint}
                            />
                        </Tooltip>
                    </div>
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
            <Modal title={"In phiếu xuất"} centered open={show} footer={false} onCancel={() => setShow(false)}>
                <PrintPx data={ctPx} />
            </Modal>
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