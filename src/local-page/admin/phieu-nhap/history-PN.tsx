import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button, Card, Col, Input, Row, Pagination } from "antd";
import { Typography } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import Divider1 from "@/component/devider";
import { ExportOutlined } from "@ant-design/icons";
import axios from "axios";
import { error } from "console";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDataHistory } from "@/redux/listPnSlice";
import formatMoney from "@/component/formatMoney";
import { API_PN } from "@/pages/api/api";
import { setPage, setPageSide, setPageTotal } from "@/redux/pagimationSlice";

const { RangePicker } = DatePicker;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
interface Order {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    status: boolean;
    tongTien: string;
  };
}

const columns: ColumnsType<DataType> = [
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tổng tiền",
    dataIndex: "tongTien",
    key: "tongTien",
  },
  {
    title: "createdAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const HistoryPN: React.FC = () => {
  const dispatch = useDispatch();
  const { historyPn } = useSelector((store: any) => store.pn);
  const { page, totalPage, pageSize } = useSelector(
    (store: any) => store.pagination
  );
  const [date, setDate] = useState<any>();

  useEffect(() => {
    date
      ? axios
          .get(
            `${API_PN}&filters[createdAt][$gte]=${
              date[0]
            }&filters[createdAt][$lte]=${
              date[1]
            }&pagination[page]=${page}&pagination[pageSize]=${
              pageSize ? pageSize : 10
            }`
          )
          .then((res) => {
            console.log(res.data.meta);
            const data = res.data.data;
            // console.log(data);
            dispatch(setPageTotal(res.data.meta.pagination.total));
            const attributes = extractAttributes(data);
            dispatch(getDataHistory(attributes));
            // console.log(attributes);
          })
          .catch((err) => {
            console.log(err);
          })
      : null;
  }, [page, date, pageSize]);
  const handleRangePickerChange = (
    dates: any,
    dateStrings: [string, string]
  ) => {
    console.log(dateStrings);
    // setDateRange(dateStrings);
    setDate(dateStrings);
  };
  function extractAttributes(arr: any) {
    return arr.map((obj: any) => {
      return {
        createdAt: obj.attributes.createdAt.toString().slice(0, 10),
        updatedAt: obj.attributes.updatedAt,
        status:
          obj.attributes.status == false ? (
            <>
              <Tag style={{ cursor: "pointer" }} color="red">
                Chưa thanh toán
              </Tag>
            </>
          ) : (
            <>
              <Tag style={{ cursor: "pointer" }} color="green">
                Thanh toán
              </Tag>
            </>
          ),
        tongTien: formatMoney(obj.attributes.tongTien),
      };
    });
  }
  // console.log(historyPn);
  const onchange = (page: any, pageSize: any) => {
    // console.log(pageSize);
    dispatch(setPageSide(pageSize));
    dispatch(setPage(page));
  };
  return (
    <>
      <Card>
        <Row gutter={16}>
          <RangePicker onChange={handleRangePickerChange} />
          {/* <Col md={6}>
            <Button className="mx-3">Xem</Button>
          </Col> */}
          {/* <Col md={11} className="flex justify-end">
            <Button icon={<ExportOutlined />}>Xuất file excel</Button>
          </Col> */}
        </Row>
        <Divider1 name="Lịch sử" />
        <Table
          columns={columns}
          dataSource={historyPn}
          style={{ maxWidth: "100vw" }}
          scroll={{ x: true }}
          pagination={false}
        />
        {date ?<> 
          <div className="flex justify-end m-3">
          <Pagination
            defaultCurrent={1}
            onChange={onchange}
            total={totalPage}
            pageSize={pageSize ? pageSize : 10}
            responsive
          />
        </div>
        </> : null}
       
      </Card>
    </>
  );
};
export default HistoryPN;
