import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProdFilter from '../product-manage/prodfilter';
import ProdTable from '../product-manage/prodtable';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Tab 1`,
        children: <>
            <ProdFilter />
            <ProdTable />
        </>,
    },
    {
        key: '2',
        label: `Tab 2`,
        children: `Content of Tab Pane 2`,
    },
    {
        key: '3',
        label: `Tab 3`,
        children: `Content of Tab Pane 3`,
    },
];

const OrderTab: React.FC = () => {
    return (
        <div className='pt-24'>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}

export default OrderTab;