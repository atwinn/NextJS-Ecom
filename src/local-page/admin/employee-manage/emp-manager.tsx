import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Divider1 from "@/component/devider";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import ButtonToolTip from "@/component/button";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import InputInfor from "@/component/form-input/inputInfor";
import Modal1 from "@/component/modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Tooltip, Popconfirm, message } from "antd";

import {
  addModalEmployee,
  fetchEmployees,
  selectEmployees,
  selectEmployeesError,
  selectEmployeesStatus,
} from "@/redux/employeeSlide";
import { AppDispatch } from "@/redux/store";
import UpdateEmployee from "./update-employee";
import axios from "axios";
import { API_EMPLOYEE } from "@/pages/api/api";
import { openModal } from "@/redux/modalSlide";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  phone: string;
}

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
      const confirm =  () => {
        // console.log(record.id);
        // setConfirmLoading(true)
         axios
          .delete(`https://l3mshop.onrender.com/api/nhan-viens/${id}`)
          .then(function (response) {
            dispatch(fetchEmployees());
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
        // try {
        //   const response = await axios.delete(
        //     `https://l3mshop.onrender.com/api/nhan-viens/${id}`
        //   );
         
        //   // console.log(response);
        // } catch (error) {
        //   console.log(error);
        //   message.error("Xóa không thành công");
        // }
      };
      const handleChange = async () => {
        // console.log(record);
        dispatch(openModal());
        dispatch(addModalEmployee(record));
        // try {
        //   const response = await axios.put(`https://l3mshop.onrender.com/api/nhan-viens/${id}`);
        //   console.log(response.data);
        // } catch (error) {
        //   console.log(error);
        //   // message.error("Xóa không thành công");
        // }
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
          </Space>
        </>
      );
    },
  },
];
const App: React.FC = () => {

  const { isOpen } = useSelector((store: any) => store.modal);
  const employees1 = useSelector(selectEmployees);
  const status = useSelector(selectEmployeesStatus);
  const error = useSelector(selectEmployeesError);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };
  const array = employees1.data;
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
        };
      }))
    : null;

  return (
    <>
      {isOpen && (
        <Modal1 title="Chỉnh sửa nhân viên">
          <UpdateEmployee />
        </Modal1>
      )}
      <Divider1 name={pageRoutes.nhanVien.title} />
      <InputInfor />
      <Divider1 name={"Danh sách nhân viên"} />
      <Table
        loading={status === "loading" ? true : false}
        columns={columns}
        dataSource={result}
      />
      {status === "failed" && <p>{error}</p>}
    </>
  );
};

export default App;
