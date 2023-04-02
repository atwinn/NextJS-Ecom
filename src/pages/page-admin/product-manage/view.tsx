import { LayoutManager } from '@/layout/layoutAdmin';
import * as React from 'react';
import { useState } from 'react';
import ProdFilter from './prodfilter';
import TitleAndAction from './title-action'
import ProdTable from './prodtable';

export interface IQLSanPhamProps {
}

export default function QLSanPham(props: IQLSanPhamProps) {

  return (
    <div className='p-5'>
      <ProdFilter />
      <TitleAndAction />
      <ProdTable />
    </div>
  );
}
QLSanPham.PageLayout = LayoutManager