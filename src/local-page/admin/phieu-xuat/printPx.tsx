import React, { useRef } from 'react';
import { Typography, Table, Button, Divider } from 'antd';
import logo from '../../../assets/logoL3M.png'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import formatMoney from '@/component/formatMoney';
import { useReactToPrint } from 'react-to-print';

const { Title, Text } = Typography;

const PrintPx = (data: any) => {
    const { pxId } = useSelector((store: any) => store.phieuxuat)

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'tenSP',
            key: 'tenSP',
        },
        {
            title: 'Số Lượng',
            dataIndex: 'sl',
            key: 'sl',
        },
        {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Bảo Hành',
            dataIndex: 'BH',
            key: 'BH',
        },
    ];

    const data2 = data.data.map((item: any) => (
        {
            key: item.product.id,
            id: item.id,
            tenSP: item.product.tenSP,
            sl: item.soLuong,
            gia: item.product.gia,
            BH: item.product.baoHanh,
        }
    ))

    const componentRef = useRef<any>();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div ref={componentRef}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Image src={logo} alt="Company Logo" width={50} height={50} style={{ marginRight: 10 }} />
                        <Title level={4}>L3M SHOP</Title>
                    </div>
                    <div>
                        <Text>{new Date().toLocaleDateString()}</Text>
                        <div className='font-semibold'>Hóa Đơn Xuất hàng</div>
                    </div>
                </div>
                <Divider />
                <div>
                    <div className='flex justify-between'>
                        <Text>Tên Khách Hàng:</Text>
                        <div>{pxId.tenKH}</div>
                    </div>
                    <div className='flex justify-between'>
                        <Text>Số điện thoại:</Text>
                        <div>0{pxId.sdt}</div>
                    </div>
                    <div className='flex justify-between'>
                        <Text>Địa chỉ:</Text>
                        <div>{pxId.diaChi}</div>
                    </div>
                </div>
                <Divider />
                <Table columns={columns} dataSource={data2} pagination={false} />
                <Text className='flex justify-end mt-5 font-bold mr-2'>Tổng tiền: {formatMoney(pxId.tongTien)}</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, height: 150, padding: 10 }}>
                    <div>
                        <Text>Khách hàng ký tên</Text>
                    </div>
                    <div>
                        <Text>Nhân viên ký tên</Text>
                    </div>
                </div>
            </div>
            <Button type="primary" onClick={handlePrint}>In phiếu</Button>
        </>
    )
}

export default PrintPx