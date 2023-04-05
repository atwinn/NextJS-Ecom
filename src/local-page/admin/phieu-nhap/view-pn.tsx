import Divider1 from "@/component/devider";
import { Button, Card, Col, Input, Row } from "antd";
import * as React from "react";
import PhieuNhapTable from "./table-pn";
import { Typography } from 'antd';

const { Title } = Typography;
export interface IAppProps {}

export default function ViewPN(props: IAppProps) {
    const birthday:Date = new Date();

  return (
    
    <>
      <Card>
        <Row gutter={16}>
          <Col md={3}>
            <Input disabled value="PN:" />
          </Col>
          <Col md={6}>
            <div className="flex">
              <Input placeholder="nhà cung cấp" />
              <Button className="ml-4">Thêm</Button>
            </div>
          </Col>
          <Col md={6}>
            <Input disabled value={birthday.toString().slice(0,25)}/>
          </Col>
          <Col md={3}>
            <Button className="ml-4">Thêm phiếu nhập</Button>
          </Col>
        </Row>
        <Title className="my-5" level={4}>Thêm phiếu nhập</Title>
        <PhieuNhapTable/>   
      </Card>
    </>
  );
}
