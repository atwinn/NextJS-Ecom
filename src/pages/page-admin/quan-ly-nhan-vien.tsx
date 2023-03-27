import { LayoutManager } from '@/layout/layoutAdmin';
import * as React from 'react';
import Header from '../head';

export interface IQlnhanVienProps {
}

export default function QlnhanVien (props: IQlnhanVienProps) {
  return (
    <div>
      {/* <Header title={pageRoutes.nhanVien.title}/> */}
      QUản lý nhan viên
    </div>
  );
}
QlnhanVien.PageLayout = LayoutManager
