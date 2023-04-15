import React, { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table, Popconfirm, Button, Tag,message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchPN, selectPnStatus } from "@/redux/listPnSlice";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  CloseOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
interface DataType {
  status: boolean;
  tongTien: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const ListPN = () => {
  const status = useSelector(selectPnStatus);
  const dispatch = useDispatch<AppDispatch>();
  const { pn } = useSelector((store: any) => store.pn);
  useEffect(() => {
    dispatch(fetchPN());
  }, [dispatch]);

  console.log(pn.data);
  let result;
  pn
    ? (result = pn.data?.map((item: any) => {
        // console.log(item.attributes.tenNCC);
        return {
          id: item.id,
          status:
            item.attributes.status == false ? (
              <>
                <Popconfirm
                  placement="top"
                  title={"Thanh toán"}
                  description={"bạn có chắc chắn không?"}
                  //  onConfirm={confirm}
                  okText="Yes"
                  okType="danger"
                  showCancel={false}
                >
                  <Tag color="red">Chưa thanh toán</Tag>
                </Popconfirm>
              </>
            ) : (
              <>
                <Tag color="green">Thanh toán</Tag>
              </>
            ),
          tongTien: item.attributes.tongTien,
          createdAt: item.attributes.createdAt.toString().slice(0, 10),
        };
      }))
    : null;
  // console.log(result);

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Tổng tiền", dataIndex: "tongTien", key: "tongTien" },
    { title: "Ngày Tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record:any) => {

        const confirm = () => {
          // console.log(record);
          axios
            .delete(`/api/deletePN?idpn=${record.id}`)
            .then(function (response) {
              dispatch(fetchPN());
              message.success("Xóa thành công");
              // console.log(response);
            })
            .catch(function (error) {
              message.error(error.response.data.error.message);
              // console.log(error.response.data.error.message); 
            })
            .finally(function () {
              // always executed
            });
        };
        return (
          <Space size="middle">
            <Popconfirm
              placement="top"
              title={"Xóa"}
              description={"bạn có chắc chắn không?"}
               onConfirm={confirm}
              okText="Yes"
              okType="danger"
              showCancel={false}
            >
              <Button
                danger
                className="flex justify-center items-center"
                shape="circle"
                icon={<CloseOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // const data: DataType[] = [];

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        dataSource={result}
        style={{ maxWidth: "100vw" }}
        scroll={{ x: true }}
        loading={status === "loading" ? true : false}
      />
    </>
  );
};

export default ListPN;
