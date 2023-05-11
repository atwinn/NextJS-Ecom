import * as React from "react";
import { Card, Table } from "antd";
import axios from "axios";
import formatMoney from "@/component/formatMoney";

export default function SanPhamSapHet() {
    const [data,setData] = React.useState<any>()
    const [loading,setLoading] = React.useState<boolean>(false)
    React.useEffect(() => {
        setLoading(true)
        axios.get("/api/products?filters[soLuongSP][$lte]=10").then((res) => {
            // console.log(res);
            setLoading(false)
            setData(res.data)
        }).catch((err) => {
            console.log(err);
            
        })
    },[])
    // console.log(data.data);
    let resutl
    data ? resutl = data.data.map((item:any) => {
        return{
            id: item.id,
            tenSP: item.attributes.tenSP,
            soluong: item.attributes.soLuongSP,
            gia:  formatMoney(item.attributes.gia)
        }
    }):null
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSP",
    },
    {
      title: "Giá",
      dataIndex: "gia",
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
    },
  ];

  return (
    <>
      <Card>
        <Table dataSource={resutl} columns={columns} loading={loading} />
      </Card>
    </>
  );
}
