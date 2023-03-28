import { LayoutManager } from '@/layout/layoutAdmin';
import * as React from 'react';
import { useState } from 'react';
import ProdFilter from './product-manage/prodfilter';
import TitleAndAction from './product-manage/title-action'
import ProdTable from './product-manage/prodtable';

export interface IQLSanPhamProps {
}

export default function QLSanPham(props: IQLSanPhamProps) {

  return (
    <>
      <ProdFilter />
      <TitleAndAction />
      <ProdTable />
    </>
  );
}
QLSanPham.PageLayout = LayoutManager