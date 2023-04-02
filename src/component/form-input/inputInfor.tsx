import React, { useState } from "react";
import { Button, Col, Form, Input, Row,Space } from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import Modal1 from "../modal";

const { Title } = Typography;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

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

const onFinish = (values: any) => {
  console.log(values);
};

const handleChange = (value: { value: string; label: React.ReactNode }) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
const style: React.CSSProperties = { margin: "8px 16px" };
const InputInfor: React.FC = () => {
  return (
    <>
        
      <div className="bg-white mt-5 py-5 border-b-2 rounded-md my-3">
      <Title style={style} level={3}>
        Thêm nhân viên
      </Title>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Row>
            <Col style={style} span={8}>
              <Form.Item
                name={["user", "name"]}
                label="Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name={["user", "age"]} label="Role">
                <Select
                  labelInValue
                  defaultValue={{ value: "1", label: "Nhân viên" }}
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "1",
                      label: "Nhân viên",
                    },
                    {
                      value: "2",
                      label: "Thủ kho",
                    },
                    {
                      value: "3",
                      label: "Quản lý",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col style={style} span={8}>
              <Form.Item name={["user", "website"]} label="Địa chỉ">
                <Input />
              </Form.Item>
              <Form.Item name={["user", "introduction"]} label="SĐT">
                <Input />
              </Form.Item>
            </Col>
            <Col style={style} span={6}>
              <Form.Item
                name={["user", "email"]}
                label="Email"
                rules={[{ type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Space className="flex justify-end">
              <Button
                type="primary"
                style={{ backgroundColor: "#1890ff" }}
                htmlType="submit"
              >
                Submit
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
