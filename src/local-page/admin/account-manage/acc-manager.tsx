import Divider1 from "@/component/devider";
import * as React from "react";
import { Space, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import ButtonToolTip from "@/component/button";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import Modal1 from "@/component/modal";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { currModal, openModal } from "@/redux/modalSlide";
import { AppDispatch } from "@/redux/store";
import { fetchAccountEmployees } from "@/redux/accountSlide";
import ChangeInForAcc from "./change-infor-acc";
interface DataType {
  username: string;
  email: string;
  blocked: boolean;
}

export default function AccountManager() {
  const { isOpen } = useSelector((store: any) => store.modal);
  const { accEmployees } = useSelector((store: any) => store.accEmployees);
  const dispatch = useDispatch<AppDispatch>();
  const addModalAcc = () => {
    dispatch(openModal());
  };
  React.useEffect(() => {
    dispatch(fetchAccountEmployees());
  }, [dispatch]);
  // console.log(accEmployees[0].blocked);
  const columns: ColumnsType<DataType> = [
    {
      title: "Usename",
      dataIndex: "username",
      key: "username",
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Tình trạng",
      dataIndex: "blocked",
      key: "blocked",
      responsive: ["md"],
      render: (_, record) => {
        const statusBlocked = record?.blocked;
        console.log(statusBlocked);
        
        return (
          <>
            {statusBlocked ? (
              <Tag color="red">ĐÃ KHÓA</Tag>
            ) : (
              <Tag color="blue">KHÔNG KHÓA</Tag>
            )}
          </>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      responsive: ["md"],
      render: (_, record) => {
        return (
          <>
          <Space wrap>
            {/* <ButtonToolTip title="Sửa" icon={<EditOutlined />} /> */}
            <Tooltip title={"Sửa"}>
              <Button
                onClick={addModalAcc}
                className="flex justify-center items-center"
                shape="circle"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <ButtonToolTip title="Xóa" icon={<CloseOutlined />} red={true} />
          </Space>
        </>
        )
      }
    },
  ];
  return (
    <>
      {isOpen && (
        <Modal1 title="Cập nhật tài khoản"><ChangeInForAcc/></Modal1>
      )}
      <Divider1 name="Quản lý Tài khoản" />
      <Table columns={columns} dataSource={accEmployees} />
    </>
  );
}
