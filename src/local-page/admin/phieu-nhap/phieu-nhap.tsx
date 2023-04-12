import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ViewPN from './view-pn';
import ListPN from './list-phieunhap';
import HistoryPN from './history-PN';
import { Typography } from 'antd';

const { Title } = Typography;
const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Thêm phiếu nhập`,
      children: <ViewPN/>,
    },
    {
      key: '2',
      label: `Danh sách phiếu nhập`,
      children: <ListPN/>,
    },
    {
      key: '3',
      label: `Lịch sử nhập hàng`,
      children: <HistoryPN/>,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
};
const PhieuNhap: React.FC = () => {
    return (
        <>
            <Title level={3} className='m-3'>Quản lý phiếu nhập</Title>
            <Tabs
                onChange={onChange}
                type="card"
                items={items}
            />
        </>
    )
}
export default PhieuNhap;