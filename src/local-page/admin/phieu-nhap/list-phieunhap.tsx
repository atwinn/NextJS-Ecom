import React, { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import {
  Badge,
  Dropdown,
  Space,
  Table,
  Popconfirm,
  Button,
  Tag,
  message,
  Tooltip,
} from "antd";
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
  tenSP: string;
  gia: string |number;
  soluong: string |number;
}

const ListPN = () => {
  const status = useSelector(selectPnStatus);
  const dispatch = useDispatch<AppDispatch>();
  const { pn } = useSelector((store: any) => store.pn);
  useEffect(() => {
    dispatch(fetchPN());
  }, [dispatch]);
  // const confirm = () => {
  //   console.log("a");
  //  }
  // console.log(pn.data);
  let result;
  pn
    ? (result = pn.data?.map((item: any) => {
        const confirm = () => {
          const idpn = { idpn: item.id };
          console.log(idpn);
          axios
            .post("/api/change-status-pn", idpn)
            .then((res) => {
              console.log(res);
              message.success(res.data.message);
              dispatch(fetchPN());
            })
            .catch((err) => {
              console.log(err);
            });
        };
        return {
          id: item.id,
          status:
            item.attributes.status == false ? (
              <>
                <Popconfirm
                  placement="top"
                  title={"Thanh toán"}
                  description={"Khi thanh toán sẽ không thể hoàn tác?"}
                  onConfirm={confirm}
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
      { title: "Tên Sản Phẩm", dataIndex: "tenSP", key: "status" },
      { title: "Giá", dataIndex: "gia", key: "status" },
      { title: "Số lượng", dataIndex: "soluong", key: "status" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => {
          return (
            <Space size="middle">
              <Tooltip title={"Sửa"}>
                <Button
                  // onClick={handleChange}
                  className="flex justify-center items-center"
                  shape="circle"
                  icon={<EditOutlined />}
                />
              </Tooltip>
              <Tooltip title={"Xóa"}>
                <Popconfirm
                  placement="top"
                  title={"Xóa"}
                  description={"bạn có chắc chắn không?"}
                  // onConfirm={confirm}
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
              </Tooltip>
            </Space>
          );
        },
      },
    ];

    const data = [{
      key: '11',
      tenSP: 'John Brown Jr.',
      gia: 16,
      soluong: 'New York No. 2 Lake Park',
    },];
    
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Tổng tiền", dataIndex: "tongTien", key: "tongTien" },
    { title: "Ngày Tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record: any) => {
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
        expandable={{expandedRowRender: (record) => <p style={{ margin: 0 }}>tesst</p>,}}
        dataSource={result}
        style={{ maxWidth: "100vw" }}
        scroll={{ x: true }}
        loading={status === "loading" ? true : false}
      />
    </>
  );
};

export default ListPN;
