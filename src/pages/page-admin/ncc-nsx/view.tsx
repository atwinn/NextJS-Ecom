import { LayoutManager } from '@/layout/layoutAdmin';
import NccNsx from '@/local-page/admin/ncc-nsx/view';
import * as React from 'react';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <>
      <NccNsx/>
    </>
  );
}
App.PageLayout = LayoutManager;
