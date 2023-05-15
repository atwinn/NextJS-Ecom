import { LayoutManager } from '@/layout/layoutAdmin';
import CustomerManage from '@/local-page/admin/customer-manage';
import * as React from 'react';

export default function CustomerAdminLayout () {
  return (
    <>
      <CustomerManage/>
    </>
  );
}
CustomerAdminLayout.PageLayout = LayoutManager;