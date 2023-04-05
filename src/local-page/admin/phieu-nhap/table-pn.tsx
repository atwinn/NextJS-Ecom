import ButtonToolTip from "@/component/button";
import { Space, Table, Tag, Row, Col, Tooltip, Button } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;
import { Form, Input } from "antd";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { TableData, addRow } from '../../../redux/tableSlice';
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
const App: React.FC = () => {
    const [form] = Form.useForm();
    const [sanpham, setSanpham] = useState('');
    const [soluong, setSoluong] = useState('');
    const [gia, setGia] = useState('');
    const dispatch = useDispatch();
    const data1 = useSelector((state: RootState) => state.table.data);
  
    const onFinish = (values: FormData) => {
      const { sanpham, soluong, gia } = values;
      dispatch(addRow({ sanpham, soluong: parseInt(soluong), gia: parseInt(gia) }));
      form.resetFields();
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
        <Form onFinish={onFinish}  onFinishFailed={onFinishFailed} autoComplete="off">
            <Table dataSource={data} pagination={false}>
                <Form.Item name={sanpham} label="sanpham">
                    <Column
                        
                        title="Sản phẩm"
                        dataIndex="sanpham"
                        render={(text: number, record: TableData, index: number) => {
                            return (
                                <>
                                <Input value={sanpham} onChange={(e) => setSanpham(e.target.value)}/>
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
                                    <Input />
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
                                    <Input />
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
                                icon={<CloseOutlined />}
                            />
                        </Tooltip>
                    )}
                />
            </Table>
        </Form>
    );
};

export default App;
