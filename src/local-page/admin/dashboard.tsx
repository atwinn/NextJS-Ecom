import DemoPie from "@/component/charts/chartPie";
import * as React from "react";
import { Col, Row } from "antd";
import DemoColumn from "@/component/charts/chart";
import { Space } from "antd";
import Statistic1 from "@/component/statistic/statistic";
import Divider1 from "@/component/devider";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
export default function Dashboard() {
  return (
    <>
      <Divider1 name={pageRoutes.home.title}/>
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
