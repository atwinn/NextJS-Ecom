import { Space, Table, Tooltip, Button } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;
import { Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TableData, addRow } from "../../../redux/tableSlice";
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";

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
  sanpham: string;
  soluong: string;
  gia: string;
}

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
const App: React.FC = () => {
  const [form] = Form.useForm();
  const [sanpham, setSanpham] = useState("");
  const dispatch = useDispatch();
  const data1 = useSelector((state: RootState) => state.table.data);
  const onFinish = (values: FormData) => {
    const { sanpham, soluong, gia } = values;
    dispatch(
      addRow({ sanpham, soluong: parseInt(soluong), gia: parseInt(gia) })
    );
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Table dataSource={data} pagination={false} style={{maxWidth: "100vw"}} scroll={{x:true}}>
        <Form.Item name={sanpham} label="sanpham">
          <Column
            title="Sản phẩm"
            dataIndex="sanpham"
            render={(text: number, record: TableData, index: number) => {
              return (
                <>
                  <AutoComplete
                    popupClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={300}
                    style={{ width: 300 }}
                    options={options}
                  />
                </>
              );
            }}
          />
        </Form.Item>
        <Form.Item name="gia" label="gia">
          <Column
            title="Giá"
            dataIndex="gia"
            key="address"
            render={() => {
              return (
                <>
                  <Input type="number" min={0} style={{minWidth:100}}/>
                </>
              );
            }}
          />
        </Form.Item>
        <Form.Item name="soluong" label="soluong">
          <Column
            title="Số lượng"
            dataIndex="soluong"
            key="tags"
            render={() => {
              return (
                <>
                  <Input type="number" min={0} style={{minWidth:100}}/>
                </>
              );
            }}
          />
        </Form.Item>
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Tooltip title={"thêm"}>
              <Button
                htmlType="submit"
                className="flex justify-center items-center"
                shape="circle"
                icon={<FileAddOutlined />}
              />
            </Tooltip>
          )}
        />
      </Table>
    </Form>
  );
};

export default App;
