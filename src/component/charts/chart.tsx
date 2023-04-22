import React, { useEffect, useState } from "react";
const Column = dynamic(
  () => import("@ant-design/plots").then(({ Column }) => Column),
  { ssr: false }
);
import { Card } from "antd";
import dynamic from "next/dynamic";
import axios from "axios";

const DemoColumn = () => {
  const [dataCol, setDataCol] = useState([]);
  useEffect(() => {
    axios
      .get("/api/thongKe12ThangGanNhat")
      .then((res) => {
        // console.log(res.data.result);
        setDataCol(res.data.result)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let data:any = [];
  dataCol.forEach((item:any) => {
    data.push({
      thang: item.month,
      type: "Tổng Bán",
      value: item.total_ban,
    });
  
    data.push({
      thang: item.month,
      type: "Doanh thu (triệu đồng)",
      value: (item.total_doanhThu / 1000000).toFixed(2),
    });
  
    data.push({
      thang: item.month,
      type: "Chi tiêu (triệu đồng)",
      value: (item.total_chiTieu / 1000000).toFixed(2) ,
    });
  
    data.push({
      thang: item.month,
      type: "Tổng phiếu nhập",
      value: item.total_nhap,
    });
  });
  const config = {
    data,
    xField: "thang",
    yField: "value",
    seriesField: "type",
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  return (
    <Card bordered={false}>
      <Column {...config} />
    </Card>
  );
};
export default DemoColumn;
