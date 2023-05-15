import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import ViewPN from "./view-pn";
import ListPN from "./list-phieunhap";
import HistoryPN from "./history-PN";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { setTab } from "@/redux/tableSlice";
import { AppDispatch } from "@/redux/store";
import { fetchPN } from "@/redux/listPnSlice";
import { useSelector } from "react-redux";
import SanPhamSapHet from "./out-of-tock";

const { Title } = Typography;

const PhieuNhap: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, pageSize } = useSelector((store: any) => store.pagination);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Thêm phiếu nhập`,
      children: <ViewPN />,
    },
    {
      key: "2",
      label: `Danh sách phiếu nhập`,
      children: (
        <ListPN
          expandedRowKeys={expandedRowKeys}
          setExpandedRowKeys={setExpandedRowKeys}
        />
      ),
    },
    {
      key: "3",
      label: `Lịch sử nhập hàng`,
      children: <HistoryPN />,
    },
    {
      key: "4",
      label: `Sản phầm gần hết`,
      children: <SanPhamSapHet />,
    },
  ];
  const onChange = (key: string) => {
    key == "2"
      ? dispatch(
          fetchPN({ page: page ? page : 1, pageSize: pageSize ? pageSize : 10 })
        )
      : null;
    key != "2" ? setExpandedRowKeys([]) : null;
    dispatch(setTab(key));
  };
  return (
    <>
      <Title level={3} className="m-3">
        Quản lý phiếu nhập
      </Title>
      <Tabs onChange={onChange} type="card" items={items} />
    </>
  );
};
export default PhieuNhap;
