import React from "react";
import { Button, Checkbox, Form, Input, AutoComplete, message } from "antd";
import { useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "@/redux/store";
import { renderTitle } from "./table-pn";
import { addRow, fetchCtPn, getSpId } from "@/redux/tableSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const UpdateCTPN: React.FC = () => {
  const { dataCTPn, idPn, idSp } = useSelector((store: any) => store.table);
  const { product } = useSelector((state: RootState) => state.product);
  const data1 = useSelector((state: RootState) => state.table.data);
  // console.log(data1);

  const dispatch = useDispatch<AppDispatch>();
  //   console.log(idSp);

  let result = [];
  // console.log(result);

  product
    ? (result = product.data?.map((item: any) => {
        // console.log(item.attributes.tenNCC);
        return {
          id: item.id,
          tenSP: item.attributes.tenSP,
        };
      }))
    : null;
  const renderItem = (title: string, count: number) => ({
    id: count,
    value: title,
    label: title,
  });
  const TenSP = result
    ? result.map((product: any) => renderItem(product.tenSP, product.id))
    : [];
  const options = [
    {
      label: renderTitle("Sản phẩm"),
      options: TenSP,
    },
  ];
  //   console.log(dataCTPn);
  const { soluong, gia } = dataCTPn;
  const onSelect = (option: any) => {
    const spId = TenSP.find((item: any) => item.value === option);
    dispatch(getSpId(spId.id));
    console.log(spId.id);
  };
  const onFinish = (values: any) => {
    const { product, soluong, gia } = values;
    values.phieu_nhap = idPn;
    values.product = idSp;
    console.log("Success:", values)
    axios.put("/api/updateCtPn",values).then((res) => {
        // console.log("in success: " , values);
        
        console.log(res);
        res.status == 200 ? message.success(res.data.message): null
        // dispatch(fetchCtPn(values))
        fetchCTPN()
      
      }).catch((err) => {
        console.log(err);
        message.error(err)
      })
  };
  // console.log(idPn);
  
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
        dispatch(fetchCtPn(result))

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
