import React, { useState, useRef } from 'react';
import { DatePicker, Tag, message, Table, Button } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import axios from 'axios';
import formatMoney from '@/component/formatMoney';

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
}[] = [
        { label: '7 ngày trước', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: '14 ngày trước', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: '30 ngày trước', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: '90 ngày trước', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

const LichSuXH: React.FC = () => {
    const [px, setPx] = useState<any[]>([])
    const tableRef = useRef<any>(null);
    const [disable, setDisable] = useState<boolean>(true)
    const onRangeChange = async (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            try {
                const res = await axios.get(`/api/phieu-xuats?sort=id:desc&filters[createdAt][$gte]=${dateStrings[0]}&filters[createdAt][$lte]=${dateStrings[1]}&pagination[page]=1&pagination[pageSize]=100`)
                setPx(res.data.data)
                setDisable(false)
            } catch (error: any) {
                if (typeof error.response !== 'undefined') {
                    message.error(error.response.data.error.message)
                }
            }
        } else {
            setPx([])
            setDisable(true)
        }
    }

    const columns = [
        {
            title: 'Khách hàng',
            dataIndex: 'tenKH',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            render: (text: any) => <Tag color="geekblue" >0{text}</Tag>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diaChi',
        },
        {
            title: 'Thanh Toán',
            dataIndex: 'ptTT',
            render: (text: any) => <Tag color="green" >{text}</Tag>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text: any) => <p>{text === 0 ? "Chưa xác nhận" : text === 1 ? "Đã xác nhận" : "Đã hủy"}</p>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'tongTien',
            render: (text: any) => <p>{formatMoney(text)}</p>,
        },
    ];

    let data = px.map((item: any) => (
        {
            key: item.id,
            tenKH: item.attributes.tenKH,
            sdt: item.attributes.sdt,
            diaChi: item.attributes.diaChi,
            ptTT: item.attributes.pt_ThanhToan,
            status: item.attributes.status,
            tongTien: item.attributes.tongTien,
        }
    ))

    const handleExportToExcel = () => {
        const worksheet = tableRef.current
        const html = worksheet?.outerHTML;
        const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `LichSuXH_${Date.now()}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className='space-y-3'>
            <div className='bg-white rounded-md p-5 flex justify-start gap-5'>
                <RangePicker
                    presets={rangePresets}
                    onChange={onRangeChange}
                    placeholder={["Từ ngày", "Đến ngày"]}
                    size='large'
                    allowClear
                />
                <Button onClick={handleExportToExcel} size='large' disabled={disable}>Xuất ra Excel</Button>
            </div>
            <Table columns={columns} dataSource={data} ref={tableRef} />
        </div>
    )
}

export default LichSuXH