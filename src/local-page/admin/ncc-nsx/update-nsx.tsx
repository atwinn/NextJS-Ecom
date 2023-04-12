import * as React from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchNcc, fetchNsx } from "@/redux/nccSlice";
import { closeModal } from "@/redux/modalSlice";

export interface IUpdateNCCNSXProps {}

export default function UpdateNSX(props: IUpdateNCCNSXProps) {
  const { nsxId } = useSelector((store: any) => store.ncc);
  console.log(nsxId);
const dispatch = useDispatch<AppDispatch>();

  const onFinish = (value: any) => {
    // console.log(value);
    axios.put(`/api/nsxes/${nsxId.id}`, {data: value}).then((res) => {
        res.status == 200 ? message.success("thành công") : null
        dispatch(fetchNsx())
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
          tenNSX: nsxId.tenNSX,
          quocGia: nsxId.quocGia,
          
        }}
        wrapperCol={{ sm: 20, offset: 2 }}
      >
        <Form.Item
          label={"Tên NCC"}
          name={"tenNSX"}
          rules={[
            { required: true, message: "Vui lòng nhập tên NCC!" },
            { min: 3, message: "Tên nhân viên phải có ít nhất 3 ký tự!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Quốc gia"}
          name={"quocGia"}
          rules={[{ required: true, message: "Vui lòng nhập quốc gia!" }]}
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
