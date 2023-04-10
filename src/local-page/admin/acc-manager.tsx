import Divider1 from '@/component/devider';
import * as React from 'react';
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ButtonToolTip from '@/component/button';
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import Modal1 from '@/component/modal';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { currModal, openModal } from '@/redux/modalSlide';
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
      responsive: ['md'],
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      responsive: ['md'],

    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ['md'],

    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      responsive: ['md'],

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
      responsive: ['md'],

      render: (_, record) => (
        <>
          <Space wrap>
            <ButtonToolTip title="Sửa" icon={<EditOutlined />} />
            <ButtonToolTip title="Xóa" icon={<CloseOutlined />} red={true} />
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
export default function AccountManager () {
  const { isOpen,curModal } = useSelector((store: any) => store.modal);
  const dispatch = useDispatch() 
  const addAcc = () => {
    dispatch(currModal("2"))
    dispatch(openModal())
  }
  return (
    <>
      {isOpen &&  <Modal1 title='Cập nhật tài khoản'>cvzxciouzxcipzxcbcvb</Modal1>}
      {isOpen && (curModal == "2" && <Modal1 title='thêm tài khoản'>cvzxciouzxcipzxcbcvb</Modal1>) }
      
      <Divider1 name='Quản lý Tài khoản'/>
      <Table columns={columns} dataSource={data} />

    </>
  );
}
