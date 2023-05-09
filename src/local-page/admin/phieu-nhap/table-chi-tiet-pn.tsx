import React from "react";
import { Space, Table, Tag, Tooltip, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import Modal1 from "@/component/modal";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import UpdateCTPN from "./update-CtPn";
import { fetchCtPn, getInforModalCtPN, getSpId } from "@/redux/tableSlice";
import axios from "axios";
const TableChiTietPN = () => {
  console.log("render chi tiet phieu nhap");
  
  const dispatch = useDispatch();
  const data1 = useSelector((state: RootState) => state.table.data);
  const { isOpen } = useSelector((store: any) => store.modal);
  // console.log(data1);
  const {  idPn } = useSelector((store: any) => store.table);
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
  const columns: ColumnsType<any> = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "sanpham",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
    },
    {
      title: "Số Lượng",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const handleChange = () => {
          dispatch(openModal());
          dispatch(getInforModalCtPN(record));
          dispatch(getSpId(record.idgetSP));
        };
        const confirm = async () => {
          // console.log(record.idgetSP);
          await axios.delete(`/api/delCtPn?phieu_nhap=${idPn}&product=${record.idgetSP}`).then((res) => {
            console.log(res.data);
            res.status == 200 ? message.success(res.data.message) : null
            fetchCTPN()
          }).catch((err) => {
            console.log(err);
            
          })
        }
        
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
  // console.log(data1);
  
  return (
    <>
      {isOpen && (
        <Modal1 title="Sửa chi tiết phiếu nhập">
          <UpdateCTPN />
        </Modal1>
      )}
      <Table
        columns={columns}
        dataSource={data1}
        // scroll={{ x: true }}
      ></Table>
    </>
  );
};

export default React.memo(TableChiTietPN);
