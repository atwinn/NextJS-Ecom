import { Button, Col, Form, Input, Row } from "antd";
import * as React from "react";
import NCCTable from "./table-list-ncc";

export interface IAppProps {
    id?: number
    name?: string,
}

export default function NCCNSXLayout(props: IAppProps) {
    const onFinish = (value: any) => {
        console.log(value);
      };
  return (
    <>
      <Form  onFinish={onFinish} labelCol= {{ span: 5}} wrapperCol= {{ span: 15, offset:1} }>
        <Row gutter={12}>
          <Col md={6}>
            <Form.Item label={props.name} name={props.id}>
              <Input />
            </Form.Item>
            <Form.Item label={"Sđt"} name={"sđt"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Địa chỉ"} name={"diachi"} >
              <Input.TextArea />
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button htmlType="submit">Thêm</Button>
            </Form.Item>
          </Col>
          <Col md={17}>
            <NCCTable/>
          </Col>
        </Row>
      </Form>
    </>
  );
}
