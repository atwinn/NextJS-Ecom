import Login from '@/component/author/login';
import * as React from 'react';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      <Login/>
    </div>
  );
}
