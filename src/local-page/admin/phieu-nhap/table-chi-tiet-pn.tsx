import React from "react";
import { Space, Table, Tag,Tooltip,Button,Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
const TableChiTietPN: React.FC = () => {
  const data1 = useSelector((state: RootState) => state.table.data);
  const columns: ColumnsType<any> = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "sanpham",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
    },
    {
      title: "Số Lượng",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
           <Tooltip title={"Sửa"}>
                <Button
                  // onClick={handleChange}
                  className="flex justify-center items-center"
                  shape="circle"
                  icon={<EditOutlined />}
                />
              </Tooltip>
              <Tooltip title={"Xóa"}>
                <Popconfirm
                  placement="top"
                  title={"Xóa"}
                  description={"bạn có chắc chắn không?"}
                  // onConfirm={confirm}
                  okText="Yes"
                  okType="danger"
                  showCancel={false}
                >
                  <Button
                    danger
                    className="flex justify-center items-center"
                    shape="circle"
                    icon={<CloseOutlined />}
                  />
                </Popconfirm>
              </Tooltip>
        </Space>
      ),
    },
  ];


  
  return (
    <>
      <Table
        columns={columns}
        dataSource={data1}
        // scroll={{ x: true }}
      >
      </Table>
      ;
    </>
  );
};

export default TableChiTietPN;
