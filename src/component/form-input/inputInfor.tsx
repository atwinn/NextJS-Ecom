import React, { useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { Typography } from "antd";
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

const style: React.CSSProperties = { margin: "8px 16px" };
const InputInfor: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Title style={style} level={3}>
        Thêm nhân viên
      </Title>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        //   style={{ maxWidth: 600 }}
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
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "age"]}
              label="Age"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col style={style} span={8}>
            <Form.Item name={["user", "website"]} label="Địa chỉ">
              <Input />
            </Form.Item>
            <Form.Item name={["user", "introduction"]} label="SĐT">
              <Input />
            </Form.Item>

            <Button htmlType="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default InputInfor;
