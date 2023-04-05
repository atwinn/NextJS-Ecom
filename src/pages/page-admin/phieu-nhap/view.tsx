import { LayoutManager } from '@/layout/layoutAdmin';
import PhieuNhap from '@/local-page/admin/phieu-nhap/phieu-nhap';
import * as React from 'react';



export default function App () {
  return (
    <div>
        <PhieuNhap/>
    </div>
  );
}
App.PageLayout = LayoutManager
