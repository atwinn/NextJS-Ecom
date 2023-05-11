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
  const [chitieu, setChiTieu] = React.useState(0);
  const [doanhThu, setDoanhThu] = React.useState(0);
  const [donHuy, setdonHuy] = React.useState(0);
  const [mess, setMess] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  // const [dataPercent, setDataPercent] = React.useState([]);
  React.useEffect(() => {
    setLoading(true)
     axios
      .get("/api/thongKeLoai")
      .then((res) => {
        // console.log(res.data);
        setLoading(false)
        setDataPercent(res.data.loai);
        setChiTieu(res.data.chiTieu)
        setDoanhThu(res.data.doanhThu)
        setdonHuy(res.data.donHuy)
        setMess(res.data.contact_false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Divider1 name={pageRoutes.home.title} />
      <Statistic1 loading={loading} chitieu={chitieu} doanhThu={doanhThu} donHuy={donHuy} mess={mess}/>
      <Row gutter={16}>
        <Col md={8} xs={24}>
          <DemoPie data={dataPercent} loading={loading}/>
        </Col>
        <Col md={16} xs={24}>
          <DemoColumn  />
        </Col>
      </Row>
    </>
  );
}
