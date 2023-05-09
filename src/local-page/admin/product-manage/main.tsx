import * as React from 'react';
import { useState } from 'react';
import ProdFilter from '../../../component/product/prodfilter';
import TitleAndAction from '../../../component/product/title-action'
import ProdTable from '../../../component/product/prodtable';
import Divider1 from '@/component/devider';
import { getCookie } from '../../../../cookies';

export interface IQLSanPhamProps {
}

export default function ProdManage(props: IQLSanPhamProps) {
    const role = typeof window !== "undefined" ? getCookie("role") : null

    return (
        <div className='md:px-5 xs:px-0 xs:py-2'>
            {role === "4"
                ? <div>
                    <Divider1 name="Quản lý sản phẩm" />
                    <TitleAndAction />
                </div>
                : null}
            <Divider1 name="Danh sách sản phẩm" />
            <ProdTable />
        </div>
    );
}