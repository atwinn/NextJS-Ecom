import React, { useEffect } from "react";
import { Space, Table, Tag, Tooltip, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CloseOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchNcc, updateNcc } from "@/redux/nccSlide";
import Modal1 from "@/component/modal";
import { useSelector } from "react-redux";
import { openModal } from "@/redux/modalSlide";
import UpdateNCCNSX from "./update-ncc-nsx";

interface DataType {
  title: string;
  dataIndex: string;
  key: string;
  render: any;
}

interface NCCType {
  data: any;
  loading: string;
}
const NCCTable = ({ data, loading }: NCCType) => {
  const { isOpen } = useSelector((store: any) => store.modal);
  const dispatch = useDispatch<AppDispatch>();
  const columns: ColumnsType<DataType> = [
    {
      title: "Nhà cung cấp",
      dataIndex: "tenNCC",
      key: "tenNCC",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: any) => {
        // console.log(record);
        const confirm = () => {
          // console.log(record.id);
          axios
            .delete(`/api/nccs/${record.id}`)
            .then((res) => {
              res.status == 200 ? message.success("Thành công") : null;
              dispatch(fetchNcc());
            })
            .catch((err) => {
              message.error("lỗi " + err);
            });
        };
        const handleChange = () => {
          dispatch(openModal());
          dispatch(updateNcc(record));
        };
        return (
          <Space size="middle">
            <Tooltip title={"Sửa"}>
              <Button
                onClick={handleChange}
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
                onConfirm={confirm}
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
        );
      },
    },
  ];

  // console.log(result.tenNCC);

  return (
    <>
      {isOpen && (
        <Modal1 title="Chỉnh sửa nhà cung cấp">
          <UpdateNCCNSX />
        </Modal1>
      )}
      <Table
        style={{ maxWidth: "100vw", minHeight: 200 }}
        scroll={{ x: true, y: 150 }}
        columns={columns}
        dataSource={data}
        loading={loading == "loading" ? true : false}
      />
      ;
    </>
  );
};

export default NCCTable;
