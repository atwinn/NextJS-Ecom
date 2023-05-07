import { Button, Col, Form, Row, Table, Tag, Tooltip, message } from "antd";
import * as React from "react";
import { Divider } from "antd";
import { Input } from "antd";
import axios from "axios";
const { TextArea } = Input;

import { BsFillReplyAllFill } from "react-icons/bs";
interface LienHeItem {
  id: string | number;
  attributes: {
    email: string;
    name: string;
    message: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
export default function ContactAdmin() {
  const [lienhe, setLienHe] = React.useState<LienHeItem[]>();
  const [loading, setloading] = React.useState<boolean>(false);
  const [loading1, setloading1] = React.useState<boolean>(false);
  const [idLh, setIdLh] = React.useState<string>("");
  const [ten, setten] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [messKH, setMessKH] = React.useState<string>("");
  const fetchData = async () => {
    try {
      setloading(true);
      const res = await axios.get("/api/lien-hes");
      // console.log(res);
      setloading(false);
      if (res.status === 200) {
        setLienHe(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  let lienheArray;
  // console.log(lienhe);
  lienhe
    ? (lienheArray = lienhe.map((item) => {
        const { email, name, message, status, createdAt } = item.attributes;
        return {
          lienhe_id: item.id,
          email,
          name,
          message,
          status:
            status == false ? (
              <Tag color="red">Chưa phản hồi</Tag>
            ) : (
              <Tag color="green">Đã phản hồi</Tag>
            ),
          createdAt: new Date(createdAt).toISOString().split("T")[0],
        };
      }))
    : null;
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tin nhắn",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: any) => {
        const handleSend = () => {
          console.log(record);
          setIdLh(record.lienhe_id);
          setten(record.name);
          setEmail(record.email);
          setMessKH(record.message);
        };
        return (
          <>
            <Tooltip title={"Gửi phản hồi"}>
              <Button
                onClick={handleSend}
                className="flex justify-center items-center"
                shape="circle"
                icon={<BsFillReplyAllFill />}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];
  const sendReply = async (data: any) => {
    try {
      setloading1(true);
      const res = await axios.put("/api/gui-mail", data);
      if (res.status === 200) {
        setloading1(false);
        message.success(res.data.message);
        fetchData();
      }
    } catch (err) {
      message.error("Gửi không thành công");
      console.log(err);
    }
  };
  const onFinish = (values: any) => {
    idLh ? (values.lienhe_id = idLh) : console.log("ko có id");
    sendReply(values);
  };
  return (
    <>
      <Row gutter={16}>
        <Col sm={6} xs={24}>
          <Divider>Phản hồi</Divider>
          <p>
            Đang phản hồi khách hàng: <b>{ten}</b>
          </p>
          <p>
            Email khách hàng: <b>{email}</b>
          </p>
          <p>
            Lời nhắn của khách hàng: <b>{messKH}</b>
          </p>
          <Form name="phanHoi" onFinish={onFinish}>
            <p>Tin nhắn phản hồi:</p>

            <Form.Item
              name={"message"}
              rules={[{ required: true, message: "Hãy nhập tin nhắn." }]}
            >
              <TextArea name="message" rows={8} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading1}>
                Gửi phản hồi
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col sm={18} xs={24}>
          <Divider>Danh sách liên hệ</Divider>
          <Table  scroll={{ x: true }} dataSource={lienheArray} columns={columns} loading={loading} />
        </Col>
      </Row>
    </>
  );
}
