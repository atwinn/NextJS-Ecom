import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchEmployees } from "@/redux/employeeSlide";
const AddAccount: React.FC = () => {
  const { employeesId } = useSelector((store: any) => store.employees);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    const validateError = "This attribute must be unique";
    setLoading(true);
    delete values.confirm;
    console.log(values);
    axios
      .post(`/api/register-with-role`, values)
      .then(function (response) {
        console.log(response);
        setLoading(false);

        dispatch(fetchEmployees());
        response.status == 200
          ? message.success("Cấp tài khoản thành công")
          : null;
      })
      .catch(function (error) {
        setLoading(false);
        error.response.data.error.message == validateError
          ? message.error("Cấp tài khoản không thành công: Username đã được sử dụng")
          : message.error(
              "Cấp tài khoản không thành công:" +
                ` ${error.response.data.error.message}`
            );
        console.log(error.response);
      })
      .finally(function () {});
  };
  return (
    <Form
      name="basic"
      labelCol={{ sm: 7 }}
      wrapperCol={{ sm: 17 }}
      layout="horizontal"
      initialValues={{ maNV: employeesId.id }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Mã nhân viên" name="maNV">
        <Input disabled style={{ maxWidth: 100 }} />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        hasFeedback
        rules={[
          { required: true, message: "Hãy nhập usename!" },
          { min: 3, message: "username phải có ít nhất 3 ký tự!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        hasFeedback
        rules={[
          {
            type: "email",
            message: "Email không hợp lệ!",
          },
          {
            required: true,
            message: "Hãy nhập E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Hãy nhập password!" }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Comfirm Password"
        // name="password"
        hasFeedback
        name="confirm"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Hãy xác nhận lại password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Password không trùng khớp!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        hasFeedback
        label="Role"
        name={["role", "id"]}
        rules={[{ required: true, message: "Hãy nhập chức vụ!" }]}
      >
        <Select
          // defaultValue="3"
          value={"3"}
          style={{ width: 150 }}
          // onChange={handleChange}
          options={[
            { value: "3", label: "Nhân viên" },
            { value: "4", label: "Thủ kho" },
            { value: "6", label: "Quản lý" },
          ]}
        />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          Cấp tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddAccount;
