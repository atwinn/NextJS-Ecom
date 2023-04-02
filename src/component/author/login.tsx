import React from "react";

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import LoginForm from "./login-form/login-form";
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Đăng nhập`,
    children: <LoginForm/>,
  },
  {
    key: '2',
    label: `Đăng ký`,
    children: <LoginForm/>,
  },
];

const onChange = (key: string) => {
  console.log(key);
};
const App: React.FC = () => 
<div className="w-full h-[100vh] flex justify-center items-center">
  <div className="bg-white w-96 h-96 rounded-lg">
  <Tabs  defaultActiveKey="1" items={items} onChange={onChange} centered/>
  </div>
</div>;

export default App;
