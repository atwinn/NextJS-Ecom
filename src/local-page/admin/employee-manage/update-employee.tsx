import React, { useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import axios from "axios";
import { API_EMPLOYEE } from "@/pages/api/api";
import moment from "moment";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchEmployees } from "@/redux/employeeSlice";
import { closeModal } from "@/redux/modalSlice";
const { TextArea } = Input;
type SizeType = Parameters<typeof Form>[0]["size"];

const UpdateEmployee: React.FC = () => {
  const { employeesId } = useSelector((store: any) => store.employees);
  const [date1, setDate1] = useState(
    moment(employeesId.ngaySinh).format("YYYY-MM-DD")
  );
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const handleChangedate: DatePickerProps["onChange"] = (
    data: any,
    datastring: string
  ) => {
    setDate1(datastring);
  };
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  let ngaySinh: string = employeesId.ngaySinh;
  // console.log(ngaySinh);
  // console.log(date1);

  const onFinish = (values: any) => {
    const key = "updatable";
    const id = employeesId.id;
    values.ngaySinh = date1;
    console.log(values);

    axios
      .put(`/api/nhan-viens/${id}`, { data: values })
      .then(function (response) {
        console.log(response);
        dispatch(fetchEmployees());
        response.status == 200
          ? messageApi.open({
              key,
              type: "success",
              content: "Chỉnh sửa nhân viên thành công",
              duration: 2,
            })
          : null;
      })
      .catch(function (error) {
        messageApi.open({
          key,
          type: "error",
          content: "Chỉnh sửa không thành công",
          duration: 2,
        });
        console.log(error);
      })
      .finally(function () {});
  };
  return (
    <>
      {contextHolder}
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        initialValues={{
          ten: employeesId.ten,
          sdt: employeesId.sdt,
          diaChi: employeesId.diaChi,
          gioiTinh: employeesId.gioiTinh ? true : false,
          ngaySinh: date1,
        }}
        onFinish={onFinish}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name={"ten"}
          label="Tên"
          rules={[
            { required: true, message: "Vui lòng nhập tên nhân viên!" },
            { min: 3, message: "Tên nhân viên phải có ít nhất 3 ký tự!" },
          ]}
          labelAlign="left"
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"sdt"}
          label="SĐT"
          labelAlign="left"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^\d{10}$/,
              message: "Số điện thoại phải có 10 chữ số!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"ngaySinh"}
          label="Năm sinh"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          labelAlign="left"
          valuePropName={"date"}
          hasFeedback
        >
          <DatePicker
            defaultValue={dayjs(ngaySinh)}
            onChange={handleChangedate}
          />
        </Form.Item>
        <Form.Item
          name={"gioiTinh"}
          label="Giới tính"
          labelAlign="left"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          hasFeedback
        >
          <Select
            style={{ width: 120 }}
            // onChange={handleChange}
            defaultValue={employeesId.gioiTinh == "Nam" ? true : false}
            options={[
              {
                value: true,
                label: "Nam",
              },
              {
                value: false,
                label: "Nữ",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name={"diaChi"}
          label="Địa chỉ"
          labelAlign="left"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          hasFeedback
        >
          <TextArea allowClear />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button htmlType="submit">Thay đổi</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateEmployee;
