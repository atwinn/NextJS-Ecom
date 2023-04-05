import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Typography } from "antd";
import NCCNSXLayout from "./ncc-nsx-layout";
import Divider1 from "@/component/devider";

const { Title } = Typography;
const App: React.FC = () => {
  return (
    <>
      <Title level={3} className="m-3">
        Quản lý nhà cung cấp / nhà sản xuất
      </Title>
      <Divider1 name="Thêm nhà cung cấp" />
      <NCCNSXLayout name="TênNCC" id={1}/>
      <Divider1 name="Thêm nhà sản xuất" />
      <NCCNSXLayout name="TênNSX" id={2}/>
    </>
  );
};

export default App;
