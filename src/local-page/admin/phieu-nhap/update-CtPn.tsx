import React from "react";
import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {  fetchCtPn, fetchCtPnInView } from "@/redux/tableSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchPN } from "@/redux/listPnSlice";

const UpdateCTPN: React.FC = () => {
  const { dataCTPn, idPn, idSp,tab } = useSelector((store: any) => store.table);
  const { product } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  // console.log(idSp);
  
  let result = [];
  product
    ? (result = product.data?.map((item: any) => {
        return {
          id: item.id,
          tenSP: item.attributes.tenSP,
        };
      }))
    : null;
  //   console.log(dataCTPn);
  const { soluong, gia } = dataCTPn;
  const onFinish = async (values: any) => {
    values.phieu_nhap = idPn;
    values.product = idSp;
    // console.log("Success:", values)
    await axios.put("/api/updateCtPn",values).then((res) => {
        res.status == 200 ? message.success(res.data.message): null
        dispatch(fetchPN({ page: 1, pageSize:10 }))
        fetchCTPN() 
      }).catch((err) => {
        console.log(err);
        message.error(err.response.data.error.message)
      })
  };
  
const fetchCTPN = () => { 
    axios
        .get(`https://l3mshop.onrender.com/api/getCtPn?id_pn=${idPn}`)
        .then((res) => {
          console.log(res.data);
          const data = res.data
          const result = data.map((item:any) => {
            return {
              product: item.product.tenSP,
              soluong: item.soluong,
              gia: parseInt(item.gia),
              idgetSP: item.product.id,
            };
          });
          // console.log(result);
          tab == 1 ? dispatch(fetchCtPn(result)) : dispatch(fetchCtPnInView(result))
        })
        .catch((err) => {
          console.log(err);
        });
   }
  return (
    <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      style={{ maxWidth: 600 }}
      initialValues={{ soluong: soluong, gia: gia }}
      onFinish={onFinish}
      autoComplete="off"
    >
      
      <Form.Item name="soluong" label="Số lượng">
        <Input type="number" min={0} style={{ minWidth: 100 }} />
      </Form.Item>
      <Form.Item name="gia" label="Giá">
        <Input type="number" min={0} style={{ minWidth: 100 }} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Sửa
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCTPN;
