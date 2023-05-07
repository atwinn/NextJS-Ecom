import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ListPhieuXuat from '@/local-page/admin/phieu-xuat/list-px';
import LichSuXH from '@/local-page/admin/phieu-xuat/lichsu';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Phiếu Xuất`,
        children: <ListPhieuXuat />,
    },
    {
        key: '2',
        label: `Lịch Sử Xuất Hàng`,
        children: <LichSuXH />,
    },
];

const OrderTab: React.FC = () => {
    return (
        <div className=''>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}

export default OrderTab;