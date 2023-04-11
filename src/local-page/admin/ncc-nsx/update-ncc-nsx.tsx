import * as React from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchNcc } from "@/redux/nccSlide";
import { closeModal } from "@/redux/modalSlide";

export interface IUpdateNCCNSXProps {}

export default function UpdateNCCNSX(props: IUpdateNCCNSXProps) {
  const { nccId } = useSelector((store: any) => store.ncc);
//   console.log(nccId.id);
const dispatch = useDispatch<AppDispatch>();

  const onFinish = (value: any) => {
    // console.log(value);
    axios.put(`/api/nccs/${nccId.id}`, {data: value}).then((res) => {
        res.status == 200 ? message.success("thành công") : null
        dispatch(fetchNcc())
        dispatch(closeModal())
    }).catch((err) => {
        message.error(err)
    })
  };
  return (
    <>
      <Form
        onFinish={onFinish}
        labelCol={{ sm: 5 }}
        initialValues={{
          tenNCC: nccId.tenNCC,
          sdt: nccId.sdt,
          diaChi: nccId.diaChi,
        }}
        wrapperCol={{ sm: 20, offset: 2 }}
      >
        <Form.Item
          label={"Tên NCC"}
          name={"tenNCC"}
          rules={[
            { required: true, message: "Vui lòng nhập tên NCC!" },
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
          <Button htmlType="submit">Sửa</Button>
        </Form.Item>
      </Form>
    </>
  );
}
