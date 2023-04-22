import DemoPie from "@/component/charts/chartPie";
import * as React from "react";
import { Col, Row } from "antd";
import DemoColumn from "@/component/charts/chart";
import Statistic1 from "@/component/statistic/statistic";
import Divider1 from "@/component/devider";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import axios from "axios";
export default function Dashboard() {
  const [dataPercent, setDataPercent] = React.useState([]);
  // const [chitieu, setChiTieu] = React.useState([]);
  // const [dan, setDataPercent] = React.useState([]);
  // const [dataPercent, setDataPercent] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/thongKeLoai")
      .then((res) => {
        console.log(res.data);
        setDataPercent(res.data.loai);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Divider1 name={pageRoutes.home.title} />
      <Statistic1 />
      <Row gutter={16}>
        <Col md={8} xs={24}>
          <DemoPie data={dataPercent}/>
        </Col>
        <Col md={16} xs={24}>
          <DemoColumn />
        </Col>
      </Row>
    </>
  );
}
