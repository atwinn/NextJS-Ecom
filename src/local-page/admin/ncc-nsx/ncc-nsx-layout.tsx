import { Button, Col, Form, Input, Row, message } from "antd";
import * as React from "react";
import NCCTable from "./table-list-ncc";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchNcc, fetchNsx } from "@/redux/nccSlice";
import { AppDispatch } from "@/redux/store";
import NSXTable from "./table-list-nsx";
export interface IAppProps {
  id?: string;
  name?: string;
  data?: any;
  dataNSX?: any;
  isloading?: any;
  isloadingNSX?: any;
}

export default function NCCNSXLayout(props: IAppProps) {
  // console.log(props.isloading);
  
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = React.useState(false);
  const [loadingNsx, setLoadingNsx] = React.useState(false);
  const onFinish = (value: any) => {
    console.log(value);
    props.id == "tenNCC" ? setLoading(true): setLoadingNsx(true)
    props.id == "tenNCC"
      ? axios
          .post("/api/nccs", { data: value })
          .then((res) => {
            res.status == 200
              ? message.success("thêm thành công")
              : message.error("thêm thất bại");
            setLoading(false);
            dispatch(fetchNcc());
            console.log(res);
          })
          .catch((err) => {
            setLoading(false);
            message.error("thêm thất bại");
            console.log(err);
          })
      : axios
      .post("/api/nsxes", { data: value })
      .then((res) => {
        res.status == 200
          ? message.success("thêm thành công")
          : message.error("thêm thất bại");
        setLoadingNsx(false);
        dispatch(fetchNsx());
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
          message.error("thêm thất bại");
        console.log(err);
      })

        ;
  };
  return (
    <>
      {props.id == "tenNCC" ? (
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
              <Form.Item className="flex justify-center">
                <Button htmlType="submit" loading={loading}>
                  Thêm
                </Button>
              </Form.Item>
            </Col>
            <Col md={17}>
              <NCCTable data={props.data} loading={props.isloading} />
            </Col>
          </Row>
        </Form>
      ) : <Form
      onFinish={onFinish}
      labelCol={{ sm: 6}}
      wrapperCol={{ sm: 14, offset: 1 }}
    >
      <Row gutter={12}>
        <Col md={6}>
          <Form.Item
            label={props.name}
            name={props.id}
            rules={[
              { required: true, message: "Vui lòng nhập tên nhà sản xuất!" },
              { min: 3, message: "Tên nhân viên phải có ít nhất 3 ký tự!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Quốc gia"}
            name={"quocGia"}
            rules={[
              { required: true, message: "Vui lòng nhập quốc gia!" },
              
            ]}
          >
            <Input />
          </Form.Item>
         
          <Form.Item className="flex justify-center">
            <Button htmlType="submit" loading={loadingNsx}>
              Thêm
            </Button>
          </Form.Item>
        </Col>
        <Col md={17}>
          <NSXTable data={props.dataNSX} loadingNSX={props.isloadingNSX}/>
        </Col>
      </Row>
    </Form>}
    </>
  );
}
