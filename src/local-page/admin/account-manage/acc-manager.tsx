import Divider1 from "@/component/devider";
import * as React from "react";
import { Space, Table, Tag, Tooltip, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import ButtonToolTip from "@/component/button";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import Modal1 from "@/component/modal";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { currModal, openModal } from "@/redux/modalSlice";
import { AppDispatch } from "@/redux/store";
import { fetchAccountEmployees, selectAccEmployeesStatus } from "@/redux/accountSlice";
import axios from "axios";
import accountService from "../../../services/account-service";
// import axios from "@/apis/axios";
interface DataType {
  username: string;
  email: string;
  blocked: boolean;
}

export default function AccountManager() {
  // const { isOpen } = useSelector((store: any) => store.modal);
  const { accEmployees,success } = useSelector((store: any) => store.accEmployees);
  const status = useSelector(selectAccEmployeesStatus);

  const dispatch = useDispatch<AppDispatch>();
  // const addModalAcc = () => {
  //   dispatch(openModal());
  // };
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
        // console.log(statusBlocked);

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
      render: (_, record:any) => {
        const confirm = () => {
          // accountService.accountGetRequest(51)
          // console.log(record.id);
          const id = record.id
          // accountService.accountDelete(id)
          
          // console.log(success);
          axios.delete(`https://l3mshop.onrender.com/api/users/${id}`).then((res) => {
            // console.log(res);
            res.status ==200 ? 
            message.success("Xóa thành công"):null
            dispatch(fetchAccountEmployees())
            
          }).catch((err) => {
            console.log(err);
            message.error("Lỗi" + err)
          })
        };
        return (
          <>
            <Space wrap>
              <Tooltip title={"Xóa"}>
                <Popconfirm
                  placement="top"
                  title={"Xóa"}
                  description={"bạn có chắc chắn không?"}
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                  okType="danger"
                  showCancel={false}
                >
                  <Button
                    // onClick={delete1}
                    danger
                    className="flex justify-center items-center"
                    shape="circle"
                    icon={<CloseOutlined />}
                  />
                </Popconfirm>
              </Tooltip>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Divider1 name="Quản lý Tài khoản" />
      <Table loading={status === "loading" ? true : false} columns={columns} dataSource={accEmployees} />
    </>
  );
}
