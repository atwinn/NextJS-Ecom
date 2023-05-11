import React, { useRef,useState } from "react";
import { Space, Table, Tooltip, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchNcc, updateNcc } from "@/redux/nccSlice";
import Modal1 from "@/component/modal";
import { useSelector } from "react-redux";
import { currModal, openModal } from "@/redux/modalSlice";
import UpdateNCCNSX from "./update-ncc";
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
interface DataType {
  title: string;
  dataIndex: string;
  key: string;
  render: any;
}

interface NCCType {
  data: any;
  loading: string;
}
const NCCTable = ({ data, loading }: NCCType) => {
  const { isOpen,curModal } = useSelector((store: any) => store.modal);
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record:any) =>
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "Nhà cung cấp",
      dataIndex: "tenNCC",
      key: "tenNCC",
      ...getColumnSearchProps('tenNCC')
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: any) => {
        // console.log(record);
        const confirm = () => {
          // console.log(record.id);
          axios
            .delete(`/api/nccs/${record.id}`)
            .then((res) => {
              res.status == 200 ? message.success("Thành công") : null;
              dispatch(fetchNcc());
            })
            .catch((err) => {
              message.error("lỗi " + err);
            });
        };
        const handleChange = () => {
          dispatch(currModal("2"))
          dispatch(openModal());
          dispatch(updateNcc(record));
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
            <Tooltip title={"Xóa"}>
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
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  // console.log(result.tenNCC);

  return (
    <>
      {(isOpen && curModal == "2") && (
        <Modal1 title="Chỉnh sửa nhà cung cấp">
          <UpdateNCCNSX />
        </Modal1>
      )}
      <Table
        style={{ maxWidth: "100vw", minHeight: 200 }}
        scroll={{ x: true, y: 150 }}
        columns={columns}
        dataSource={data}
        loading={loading == "loading" ? true : false}
      />
      
    </>
  );
};

export default NCCTable;
