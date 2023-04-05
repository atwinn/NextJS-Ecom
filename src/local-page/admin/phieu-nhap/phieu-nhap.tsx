import React, { CSSProperties } from 'react';
import { Tabs,Input } from 'antd';
import Divider1 from '@/component/devider';
import { type } from 'os';
import type { TabsProps } from 'antd';
import ViewPN from './view-pn';
import ListPN from './list-phieunhap';
import HistoryPN from './history-PN';

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
            <Divider1 name='Phiếu nhập'/>
            <Tabs
                onChange={onChange}
                type="card"
                items={items}
            />
        </>
    )
}
export default PhieuNhap;