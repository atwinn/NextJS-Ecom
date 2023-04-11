import { Button, Col, Form, Input, Row, message } from "antd";
import * as React from "react";
import NCCTable from "./table-list-ncc";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchNcc } from "@/redux/nccSlide";
import { AppDispatch } from "@/redux/store";
export interface IAppProps {
  id?: string;
  name?: string;
  data?: any;
  isloading?: any;
}

export default function NCCNSXLayout(props: IAppProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [loading,setLoading] = React.useState(false)
  const onFinish = (value: any) => {
    setLoading(true)
    console.log(value);
    props.id == "tenNCC"
      ? axios
          .post("/api/nccs", { data: value })
          .then((res) => {
            res.status == 200
              ? message.success("thêm thành công")
              : message.error("thêm thất bại");
              setLoading(false)
            dispatch(fetchNcc())
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      : // console.log("ok")

        null;
  };
  return (
    <>
      <Form
        onFinish={onFinish}
        labelCol={{ sm: 5 }}
        wrapperCol={{ sm: 15, offset: 2 }}
      >
        <Row gutter={12}>
          <Col md={6}>
            <Form.Item
              label={props.name}
              name={props.id}
              rules={[
                { required: true, message: "Vui lòng nhập tên!" },
                { min: 3, message: "Tên nhân viên phải có ít nhất 3 ký tự!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Sđt"}
              name={"sdt"}
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^\d{10}$/,
                  message: "Số điện thoại phải có 10 chữ số!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Địa chỉ"}
              name={"diaChi"}
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item className="flex justify-center" >
              <Button htmlType="submit" loading={loading}>Thêm</Button>
            </Form.Item>
          </Col>
          <Col md={17}>
            <NCCTable data={props.data} loading={props.isloading} />
          </Col>
        </Row>
      </Form>
    </>
  );
}
