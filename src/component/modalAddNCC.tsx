import { Button, Form, Input } from "antd";
import * as React from "react";

export interface IModalAddNCCProps {}

export default function ModalAddNCC(props: IModalAddNCCProps) {
  const onFinish = (value: any) => {
    console.log(value);
  };
  return (
    <>
      <div>
        <Form onFinish={onFinish} labelCol= {{ span: 5} } wrapperCol= {{ span: 15, offset:1} }>
          <Form.Item label="Tên NCC" name={"NCC"}>
            <Input required />
          </Form.Item>
          <Form.Item  label="Địa chỉ" name={"diachi"}>
            <Input required />
          </Form.Item>
          <Form.Item  label="Số điện thoại" name={"sdt"}>
            <Input required />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button  htmlType="submit">Thêm</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
