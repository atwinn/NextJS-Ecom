import { LayoutManager } from '@/layout/layoutAdmin';
import ProdManage from '@/local-page/admin/product-manage/main';
import * as React from 'react';
import { useState } from 'react';

export interface IQLSanPhamProps {
}

export default function QLSanPham(props: IQLSanPhamProps) {

  return (
    <ProdManage />
  );
}
QLSanPham.PageLayout = LayoutManager