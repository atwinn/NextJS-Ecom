import React, { useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Typography } from "antd";
import NCCNSXLayout from "./ncc-nsx-layout";
import Divider1 from "@/component/devider";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/redux/store";
import { fetchEmployees } from "@/redux/employeeSlide";
import { fetchNcc, selectNcc, selectNccError, selectNccStatus } from "@/redux/nccSlide";
const { Title } = Typography;
const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const ncc = useSelector(selectNcc);
  const status = useSelector(selectNccStatus);
  const error = useSelector(selectNccError);

  
  useEffect(() => {
    dispatch(fetchNcc())
  },[dispatch])
   
      let result;
      ncc
        ? (result = ncc.data?.map((item: any) => {
            return {
              id: item.id,
              tenNCC: item.attributes.tenNCC,
              diaChi: item.attributes.diaChi,
              sdt: item.attributes.sdt,
            };
          }))
        : null;
  
  return (
    <>
      <Title level={3} className="m-3">
        Quản lý nhà cung cấp / nhà sản xuất
      </Title>
      <Divider1 name="Thêm nhà cung cấp" />
      <NCCNSXLayout name="TênNCC" id={"tenNCC"} data={result} isloading={status}/>
      <Divider1 name="Thêm nhà sản xuất" />
      <NCCNSXLayout name="TênNSX" id={"TenNSX"}/>
    </>
  );
};

export default App;
