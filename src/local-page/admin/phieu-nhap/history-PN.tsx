import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button, Card, Col, Input, Row } from "antd";
import { Typography } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import Divider1 from "@/component/devider";
import { ExportOutlined } from "@ant-design/icons";

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
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
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

const HistoryPN: React.FC = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <Card>
        <Row gutter={16}>
          <Col md={3}>
            <DatePicker onChange={onChange} />
          </Col>
          <p className="my-auto">➡️</p>
          <Col md={3}>
            <DatePicker onChange={onChange} />
          </Col>
          <Col md={6}>
            <Button className="mx-3">Xem</Button>
          </Col>
          <Col md={11} className="flex justify-end">
            <Button icon={<ExportOutlined />}>Xuất file excel</Button>
          </Col>
        </Row>
        <Divider1 name="Lịch sử" />
        <Table
          columns={columns}
          dataSource={data}
          style={{ maxWidth: "100vw" }}
          scroll={{ x: true }}
        />
        ;
      </Card>
    </>
  );
};
export default HistoryPN;
