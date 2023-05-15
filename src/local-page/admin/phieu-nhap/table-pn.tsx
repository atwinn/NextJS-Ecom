import { Table, Tooltip, Button,message } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
const { Column } = Table;
import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchCtPn, getSpId } from "../../../redux/tableSlice";
import { AutoComplete } from "antd";
import { fetchProduct } from "@/redux/productSlice";
import axios from "axios";

interface DataType {
  key?: React.Key;
  sanpham: string;
  gia: number | null;
  soluong: number | null;
}

const data: DataType[] = [
  {
    key: "1",
    sanpham: "",
    gia: null,
    soluong: null,
  },
];
interface FormData {
  product: string;
  soluong: string;
  gia: string;
  phieu_nhap: string;
}

export const renderTitle = (title: string) => (
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


const PhieuNhapTable = ({form}:any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { idSp,idPn } = useSelector((store: any) => store.table);
  // console.log("render PhieuNhap table");
  
  const {product} = useSelector((state: RootState) => state.product);
  useEffect(() => {
    dispatch(fetchProduct())
  },[dispatch])
  let result = []
  product
  ? (result = product.data?.map((item: any) => {
    return {
      id: item.id,
      tenSP: item.attributes.tenSP,
    };
  }))
  : null;
 
  const renderItem = (title: string, count: number) => ({
    id:count,
    value: title,
    label: title
  });
  const TenSP = result ? result.map((product: any) => renderItem(product.tenSP,product.id)) : [];
  const options = [
    {
      label: renderTitle("Sản phẩm"),
      options: TenSP
    },
  ];
  const onSelect = (option: any) => {
    const spId = TenSP.find((item:any) => item.value === option);
    dispatch(getSpId(spId.id))
    
  }
  const fetchCTPN = async () => { 
    await axios
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
          console.log(result);
        dispatch(fetchCtPn(result))
          
        })
        .catch((err) => {
          console.log(err);
        });
   }
  const onFinish = (values: FormData) => {
    values.phieu_nhap = idPn
    values.product = idSp
    console.log(values);
    axios.post("/api/addCtPn",values).then((res) => {
      console.log(res.data);
      if (res.status == 200) {
        fetchCTPN()
        message.success("Thêm chi tiết PN thành công")
      }
    }).catch((err) => {
      message.error(err.response.data.error.message)
    })

  };
  
  return (
    <Form onFinish={onFinish} form={form}>
      <Table
        dataSource={data}
        pagination={false}
        style={{ maxWidth: "100vw" }}
        scroll={{ x: true }}
      >
        <Column
          title="Sản phẩm"
          dataIndex="product"
          render={() => {
            return (
              <>
                <Form.Item name={"product"}>
                  <AutoComplete
                    popupClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={300}
                    style={{ width: 300 }}
                    options={options}
                    onSelect={onSelect}
                  />
                </Form.Item>
              </>
            );
          }}
        />
        <Column
          title="Giá"
          dataIndex="gia"
          key="address"
          render={() => {
            return (
              <>
                <Form.Item name="gia">
                  <Input type="number" min={0} style={{ minWidth: 100 }} />
                </Form.Item>
              </>
            );
          }}
        />
        <Column
          title="Số lượng"
          dataIndex="soluong"
          key="tags"
          render={() => {
            return (
              <>
                <Form.Item name="soluong">
                  <Input type="number" min={0} style={{ minWidth: 100 }} />
                </Form.Item>
              </>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Form.Item>
                <Tooltip title={"thêm"}>
                <Button
                  htmlType="submit"
                  className="flex justify-center items-center"
                  shape="circle"
                  icon={<FileAddOutlined />}
                />
            </Tooltip>
              </Form.Item>
          )}
        />
      </Table>
    </Form>
  ); 
};

export default React.memo(PhieuNhapTable);
