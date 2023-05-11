import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table,Divider,Tooltip,Popconfirm } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import axios from "axios";
import {
    CloseOutlined,
    EditOutlined,
  } from "@ant-design/icons";
import Modal1 from "@/component/modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import UpdateKH from "./updateKH";
import { AppDispatch } from "@/redux/store";
interface DataType {
  id?: string;
  ten?: string;
  sdt?: number | string;
  ngaySinh?: string;
  gioiTinh?: boolean;
  diaChi?: string;
}

type DataIndex = keyof DataType;

const CustomerManage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [dataKH, setDataKH] = useState<any>();
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const { isOpen } = useSelector((store: any) => store.modal);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    axios
      .get("/api/khach-hangs")
      .then((res) => {
        console.log(res);
        setDataKH(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(dataKH);
  let result;
  dataKH
    ? (result = dataKH.data.map((item: any) => {
        return {
          id: item.id,
          ten: item.attributes.ten == null ? "..." : item.attributes.ten,
          sdt: item.attributes.sdt == null ? "..." : item.attributes.sdt,
          ngaySinh:
            item.attributes.ngaySinh == null ? "..." : item.attributes.ngaySinh,
          gioiTinh: item.attributes.gioiTinh == true ? "Nam" : "Nu",
          diaChi:
            item.attributes.diaChi == null ? "..." : item.attributes.diaChi,
        };
      }))
    : null;
  console.log(result);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên Khách hàng",
      dataIndex: "ten",
      key: "ten",
      width: "20%",
      ...getColumnSearchProps("ten"),
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      width: "20%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => {
        console.log(record);
        // const confirm = () => {
        //   console.log(record.id);
          
        // };
        const handleChange = () => {

            dispatch(openModal());
        };
        return (
          <Space size="middle">
            <Tooltip title={"Sửa"}>
              <Button
                onClick={handleChange}
                className="flex justify-center items-center"
                shape="circle"
                icon={<EditOutlined />}
              />
            </Tooltip>
            {/* <Tooltip title={"Xóa"}>
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
            </Tooltip> */}
          </Space>
        );
      },
    },
  ];

  return (
    <>
    {(isOpen &&
        <Modal1 title="Chỉnh sửa khách hàng">
               <UpdateKH/> 
        </Modal1>
      )}
        <Divider></Divider>
        <h1>Quản lý khách hàng</h1>
        <Divider></Divider>
      <Table columns={columns} dataSource={result} />;
    </>
  );
};

export default CustomerManage;
