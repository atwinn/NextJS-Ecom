import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Divider1 from "@/component/devider";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import ButtonToolTip from "@/component/button";
import {
  CloseOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import InputInfor from "@/component/form-input/inputInfor";
import Modal1 from "@/component/modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Tooltip, Popconfirm, message,Pagination } from "antd";

import {
  addModalEmployee,
  fetchEmployees,
  selectEmployees,
  selectEmployeesError,
  selectEmployeesStatus,
} from "@/redux/employeeSlice";
import { AppDispatch } from "@/redux/store";
import UpdateEmployee from "./update-employee";
import axios from "axios";
import { API_EMPLOYEE } from "@/pages/api/api";
import { openModal } from "@/redux/modalSlice";
import AddAccount from "./add-account";
import { setPage, setPageSide, setPageTotal } from "@/redux/pagimationSlice";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  phone: string;
}
const App: React.FC = () => {
  const { isOpen } = useSelector((store: any) => store.modal);
  const employees1 = useSelector(selectEmployees);
  const [pos, setPos] = useState("");
  const status = useSelector(selectEmployeesStatus);
  const error = useSelector(selectEmployeesError);
  const dispatch = useDispatch<AppDispatch>();
  
  const { page,totalPage,pageSize } = useSelector((store: any) => store.pagination);
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      key: "age",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "phone",
    },
    {
      title: "Năm sinh",
      dataIndex: "ngaySinh",
      key: "birth",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => {
        let id = record.id;
        const dispatch = useDispatch<AppDispatch>();
        const confirm = () => {
          axios
            .delete(`/api/delete-nv?id=${id}`)
            .then(function (response) {
              dispatch(fetchEmployees(page));
              message.success("Xóa thành công");
              // console.log(response);
            })
            .catch(function (error) {
              message.error("Xóa không thành công");
              // console.log(error);
            })
            .finally(function () {
              // always executed
            });
        };
        const handleChange = async () => {
          setPos("");
          dispatch(openModal());
          dispatch(addModalEmployee(record));
        };
        const handleChangeAccount = async () => {
          setPos("1");
          dispatch(openModal());
          dispatch(addModalEmployee(record));
        };

        return (
          <>
            <Space wrap>
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
              {record.account == null ? (
                <Tooltip title={"Cấp tài khoản"}>
                  <Button
                    onClick={handleChangeAccount}
                    className="flex justify-center items-center"
                    shape="circle"
                    icon={<UserAddOutlined />}
                  />
                </Tooltip>
              ) : null}
            </Space>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(fetchEmployees(page));
  }, [dispatch,page]);
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };
  const array = employees1.data;
  const paginate = employees1.meta;
  // console.log(array);
  let result;
  array
    ? (result = array.map((item: any) => {
      return {
        id: item.id,
        ten: item.attributes.ten,
        diaChi: item.attributes.diaChi,
        sdt: item.attributes.sdt,
        ngaySinh: formatDate(item.attributes.ngaySinh),
        gioiTinh: item.attributes.gioiTinh == true ? "Nam" : "Nữ",
        account: item.attributes.users_permissions_user.data,
      };
    }))
    : null;

 
  // console.log(paginate.pagination)
  
  paginate ? dispatch(setPageTotal(paginate.pagination.total)): null
  paginate ? dispatch(setPageSide(paginate.pagination.pageSize)): null
 
  

const onchange = (page:any,pageSize:any) => {
  dispatch(setPage(page))
}
  return (
    <>
      {isOpen &&
        (pos !== "1" ? (
          <Modal1 title="Chỉnh sửa nhân viên">
            <UpdateEmployee />
          </Modal1>
        ) : (
          <Modal1 title="Cấp tài khoản">
            <AddAccount />
          </Modal1>
        ))}
      <Divider1 name={pageRoutes.nhanVien.title} />
      <InputInfor />
      <Divider1 name={"Danh sách nhân viên"} />
      <Table
        loading={status === "loading" ? true : false}
        columns={columns}
        dataSource={result}
        pagination={false}
      />
      <div className="flex justify-end m-3">
      <Pagination defaultCurrent={1} onChange={onchange} total={totalPage} pageSize={pageSize} responsive/>
      </div>
      {status === "failed" && message.error(error)}
    </>
  );
};

export default App;
