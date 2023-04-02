import { LayoutManager } from '@/layout/layoutAdmin';
import * as React from 'react';
import { useState } from 'react';
import ProdFilter from '../../../component/product/prodfilter';
import TitleAndAction from '../../../component/product/title-action'
import ProdTable from '../../../component/product/prodtable';
import Divider1 from '@/component/devider';

export interface IQLSanPhamProps {
}

export default function QLSanPham(props: IQLSanPhamProps) {

  return (
    <div className='md:px-5 xs:px-0 xs:py-2'>
      <Divider1 name="Quản lý sản phẩm" />
      <ProdFilter />
      <TitleAndAction />
      <Divider1 name="Danh sách sản phẩm" />
      <ProdTable />
    </div>
  );
}
QLSanPham.PageLayout = LayoutManager