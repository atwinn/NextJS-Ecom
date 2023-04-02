import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Divider1 from "@/component/devider";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import ButtonToolTip from "@/component/button";
import {CloseOutlined,EditOutlined  }  from "@ant-design/icons" 
import InputInfor from "@/component/form-input/inputInfor";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <>
        <Space wrap>
          <ButtonToolTip title="Sửa" icon={<EditOutlined />}/>
          <ButtonToolTip title="Xóa" icon={<CloseOutlined />} red={true}/>
        </Space>
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const App: React.FC = () => {
  return (
    <>
      <Divider1 name={pageRoutes.nhanVien.title} />
      <InputInfor/>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default App;
