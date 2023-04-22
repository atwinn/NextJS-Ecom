import React, { useState, useEffect } from "react";
import { Card } from "antd";
import dynamic from "next/dynamic";
import axios from "axios";
const Pie = dynamic(() => import("@ant-design/plots").then(({ Pie }) => Pie), {
  ssr: false,
});

const DemoPie = (props:any) => {
  // console.log(props.data);
  let data = [];
  data = props.data?.map((item: any) => {
    return {
      type: item.tenLoai,
      value: Math.round(item.phanTram * 100),
    };
  });
  const config: any = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <Card bordered={false}>
      <Pie {...config} />
    </Card>
  );
};

export default DemoPie;
