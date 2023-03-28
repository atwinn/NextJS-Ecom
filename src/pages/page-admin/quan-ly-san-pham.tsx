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
    <>
      <ProdFilter />
      <TitleAndAction />
      <ProdTable />
    </>
  );
}
QLSanPham.PageLayout = LayoutManager