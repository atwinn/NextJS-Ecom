import Divider1 from "@/component/devider";
import { Button, Card, Col, Input, Row } from "antd";
import * as React from "react";
import PhieuNhapTable from "./table-pn";
import { Typography } from "antd";
const { Title } = Typography;
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";
import TableChiTietPN from "./table-chi-tiet-pn";
export interface IAppProps {}

export default function ViewPN(props: IAppProps) {
  const birthday: Date = new Date();
  const [value, setValue] = React.useState("");

  const renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: "right" }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    ),
  });
  const options = [
    {
      label: renderTitle("Libraries"),
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    }
  ];
  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };
  return (
    <>
      <Card>
        <Row gutter={16}>
          <Col md={3}>
            <Input disabled value="PN:" />
          </Col>
          <Col md={6}>
            <div className="flex">
              <AutoComplete
                options={options}
                style={{ width: 200 }}
                onSelect={onSelect}
                // onSearch={(text) => setOptions(getPanelValue(text))}
                placeholder="nhà cung cấp"
              />
              <Button className="ml-4">Thêm</Button>
            </div>
          </Col>
          <Col md={6}>
            <Input disabled value={birthday.toString().slice(0, 25)} />
          </Col>
          <Col md={3}>
            <Button className="ml-4">Thêm phiếu nhập</Button>
          </Col>
        </Row>
        <Divider1 name="Thêm phiếu nhập"/>
        <PhieuNhapTable />
        <Divider1 name='Chi tiết phiếu nhập'/>
        <TableChiTietPN/>
      </Card>
    </>
  );
}
