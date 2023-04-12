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
import { fetchNcc, fetchNsx, updateNcc, updateNsx } from "@/redux/nccSlice";
import Modal1 from "@/component/modal";
import { useSelector } from "react-redux";
import { currModal, openModal } from "@/redux/modalSlice";
import UpdateNCCNSX from "./update-ncc";
import UpdateNSX from "./update-nsx";

interface DataType {
  title: string;
  dataIndex: string;
  key: string;
  render: any;
}

interface NCCType {
  data: any;
  loadingNSX?: string;
}
const NSXTable = ({ data,loadingNSX }: NCCType) => {
  const { isOpen,curModal } = useSelector((store: any) => store.modal);
  const dispatch = useDispatch<AppDispatch>();
  const columns: ColumnsType<DataType> = [
    {
      title: "Nhà sản xuất",
      dataIndex: "tenNSX",
      key: "tenNSX",
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      key: "quocGia",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => {
        // console.log(record);
        const confirm = () => {
          // console.log(record.id);
          axios
            .delete(`/api/nsxes/${record.id}`)
            .then((res) => {
              res.status == 200 ? message.success("Thành công") : null;
              dispatch(fetchNsx());
            })
            .catch((err) => {
              message.error("lỗi " + err);
            });
        };
        const handleChange = () => {
          dispatch(currModal("1"))
          dispatch(openModal());
          dispatch(updateNsx(record));
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
      {(isOpen && curModal == "1") && (
        <Modal1 title="Chỉnh sửa nhà sản xuất">
          <UpdateNSX/>
        </Modal1>
      )}
      <Table
        style={{ maxWidth: "100vw", minHeight: 200 }}
        scroll={{ x: true, y: 150 }}
        columns={columns}
        dataSource={data}
        loading={loadingNSX == "loading" ? true : false }
      />
      ;
    </>
  );
};

export default NSXTable;
