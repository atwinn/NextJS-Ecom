import { LayoutManager } from '@/layout/layoutAdmin';
import * as React from 'react';
import { useState } from 'react';
import ProdFilter from '../../../component/product/prodfilter';
import TitleAndAction from '../../../component/product/title-action'
import ProdTable from '../../../component/product/prodtable';

export interface IQLSanPhamProps {
}

export default function QLSanPham(props: IQLSanPhamProps) {

  return (
    <div className='md:p-5 xs:px-0 xs:py-2'>
      <ProdFilter />
      <TitleAndAction />
      <ProdTable />
    </div>
  );
}
QLSanPham.PageLayout = LayoutManager