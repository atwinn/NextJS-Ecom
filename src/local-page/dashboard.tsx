import DemoPie from "@/component/charts/chartPie";
import * as React from "react";
import { Divider } from "antd";
import { Col, Row } from "antd";
import DemoColumn from "@/component/charts/chart";
import { Space } from "antd";
import Statistic1 from "@/component/statistic/statistic";
export default function Dashboard() {
  return (
    <>
      <Divider orientation="left" plain>
        Dashboard
      </Divider>
        <Statistic1/>
      <Row>
        <Col span={8}>
          <Space size={"middle"}>
            <DemoPie />
          </Space>
        </Col>
        <Col span={16}>
          <DemoColumn />
        </Col>
      </Row>
    </>
  );
}
