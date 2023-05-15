import React, { useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Typography } from "antd";
import NCCNSXLayout from "./ncc-nsx-layout";
import Divider1 from "@/component/devider";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/redux/store";
import { fetchEmployees } from "@/redux/employeeSlice";
import { fetchNcc, fetchNsx, selectNcc, selectNccError, selectNccStatus, selectNsx, selectNsxStatus } from "@/redux/nccSlice";
const { Title } = Typography;
const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const ncc = useSelector(selectNcc);
  const nsx = useSelector(selectNsx);
  const status = useSelector(selectNccStatus);
  const statusNSX = useSelector(selectNsxStatus);
  const error = useSelector(selectNccError);
  
  useEffect(() => {
    dispatch(fetchNcc())
    dispatch(fetchNsx())
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

      let resultNSX;
      ncc
        ? (resultNSX = nsx.data?.map((item: any) => {
            return {
              id: item.id,
              tenNSX: item.attributes.tenNSX,
              quocGia: item.attributes.quocGia,
            };
          }))
        : null;


  // console.log(resultNSX);
  
  return (
    <>
      <Title level={3} className="m-3">
        Quản lý nhà cung cấp / nhà sản xuất
      </Title>
      <Divider1 name="Thêm nhà cung cấp" />
      <NCCNSXLayout name="TênNCC" id={"tenNCC"} data={result} isloading={status}/>
      <Divider1 name="Thêm nhà sản xuất" />
      <NCCNSXLayout name="TênNSX" id={"tenNSX"} dataNSX={resultNSX} isloadingNSX={statusNSX}/>
    </>
  );
};

export default App;
