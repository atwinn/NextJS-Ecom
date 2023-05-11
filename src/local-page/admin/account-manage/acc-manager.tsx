import Divider1 from "@/component/devider";
import * as React from "react";
import { Space, Table, Tag, Tooltip, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchAccountEmployees, selectAccEmployeesStatus } from "@/redux/accountSlice";
import axios from "axios";
interface DataType {
  username: string;
  email: string;
  blocked: boolean;
}

export default function AccountManager() {
  const { accEmployees,success } = useSelector((store: any) => store.accEmployees);
  const status = useSelector(selectAccEmployeesStatus);
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    dispatch(fetchAccountEmployees());
  }, [dispatch]);
   
 
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
      render: (_, record:any) => {
        const statusBlocked = record?.blocked;
        const hanldeBlocker = async () => {
          // console.log(statusBlocked == false ? true : false);
          await axios.put(`/api/users/${record.id}?sort=id:desc`, {blocked: statusBlocked == false ? true : false}).then((res) => {
            // console.log(res);
              dispatch(fetchAccountEmployees());
            message.success("Khóa thành công")
          } ).catch((err) => {
            console.log(err);
            message.success("Lỗi")
          })
        }
        return (
          <>
            {statusBlocked ? (
              <Tag color="red" className="cursor-pointer" onClick={hanldeBlocker}>ĐÃ KHÓA</Tag>
            ) : (
              <Tag color="blue" className="cursor-pointer" onClick={hanldeBlocker}>KHÔNG KHÓA</Tag>
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
          const id = record.id
          axios.delete(`/api/users/${id}`).then((res) => {
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
