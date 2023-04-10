import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  DatePicker,
  message,
} from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import type { DatePickerProps } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_EMPLOYEE } from "@/pages/api/api";
import { fetchEmployees } from "@/redux/employeeSlide";
import { AppDispatch } from "@/redux/store";

const { TextArea } = Input;
const { Title } = Typography;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

// const handleChange = (value: boolean) => {
//   console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
//   // return value
// };
const style: React.CSSProperties = { margin: "8px 16px" };
const InputInfor: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const key = "updatable";
  const [form] = Form.useForm();
  const [date1, setDate1] = useState("");
  const onFinish = (values: any) => {
    values.ngaySinh = date1;
    axios
      .post(API_EMPLOYEE, { data: values })
      .then(function (response) {
        console.log(response);
        response.status == 200
          ? messageApi.open({
              key,
              type: "success",
              content: "Thêm nhân viên thành công",
              duration: 2,
            })
          : "lỗi";
       dispatch(fetchEmployees());
      })
      .catch(function (error) {
        messageApi.open({
          key,
          type: "error",
          content: "Thêm không thành công",
          duration: 2,
        });
        console.log(error);
      })
      .finally(function () {});
  };

  const handleChangedate: DatePickerProps["onChange"] = (
    data: any,
    datastring: string
  ) => {
    setDate1(datastring);
  };
  return (
    <>
      {contextHolder}
      <div className="bg-white mt-5 py-5 border-b-2 rounded-md my-3">
        <Title style={style} level={3}>
          Thêm nhân viên
        </Title>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15, offset: 1 }}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Row>
            <Col style={style} sm={8} xs={9}>
              <Form.Item
                name={"ten"}
                label="Tên"
                rules={[
                  { required: true, message: "Vui lòng nhập tên nhân viên!" },
                  { min: 3, message: "Tên nhân viên phải có ít nhất 3 ký tự!" },
                ]}
                labelAlign="left"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"gioiTinh"}
                label="Giới tính"
                labelAlign="left"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
              >
                <Select
                  style={{ width: 120 }}
                  // onChange={handleChange}
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
            </Col>
            <Col style={style} md={8} xs={9}>
              <Form.Item
                // name={"ngaySinh"}
                label="Năm sinh"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày sinh!" }
                ]}
                labelAlign="left"
                required
              >
                <DatePicker onChange={handleChangedate} />
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
              >
                <Input />
              </Form.Item>
            </Col>
            <Col style={style} md={6}>
              <Form.Item
                name={"diaChi"}
                label="Địa chỉ"
                labelAlign="left"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <TextArea allowClear />
              </Form.Item>
              <Space className="flex justify-center">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#1890ff" }}
                  htmlType="submit"
                >
                  Thêm nhân viên
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default InputInfor;
