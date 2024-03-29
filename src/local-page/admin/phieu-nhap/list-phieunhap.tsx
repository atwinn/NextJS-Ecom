import React, { useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Tag,
  message,
  Tooltip,
  Pagination,
  Modal,
} from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchPN, selectPnStatus } from "@/redux/listPnSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  CloseOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import {
  fetchCtPnInView,
  getIdPN,
  getInforModalCtPN,
  getSpId,
} from "@/redux/tableSlice";
import Modal1 from "@/component/modal";
import UpdateCTPN from "./update-CtPn";
import { openModal } from "@/redux/modalSlice";
import formatMoney from "@/component/formatMoney";
import { setPage, setPageSide, setPageTotal } from "@/redux/pagimationSlice";
import PrintPN from "./printPN";

interface DataType {
  status: boolean;
  tongTien: string;
  createdAt: string;
}
interface InforPN {
  inforPn: [];
  inforCTPN: {};
}
const ListPN = ({ expandedRowKeys, setExpandedRowKeys }: any) => {
  const status = useSelector(selectPnStatus);
  const { isOpen } = useSelector((store: any) => store.modal);
  const { idPn } = useSelector((store: any) => store.table);
  const [show, setShow] = useState<boolean>(false);
  const [inforPrinter, setInforPrinter] = useState<InforPN>();
  const { page, totalPage, pageSize } = useSelector(
    (store: any) => store.pagination
  );

  const dispatch = useDispatch<AppDispatch>();
  const dataInView = useSelector((state: RootState) => state.table.dataInView);
  const [loading, setloading] = useState(false);
  const { pn } = useSelector((store: any) => store.pn);
  useEffect(() => {
    dispatch(
      fetchPN({ page: page ? page : 1, pageSize: pageSize ? pageSize : 10 })
    );
  }, [dispatch, page, pageSize]);
  // console.log(pn);

  let result;
  pn
    ? (result = pn.data?.map((item: any) => {
        const confirm = () => {
          const idpn = { idpn: item.id };
          // console.log(idpn);
          axios
            .post("/api/change-status-pn", idpn)
            .then((res) => {
              // console.log(res);
              message.success(res.data.message);
              dispatch(
                fetchPN({
                  page: page ? page : 1,
                  pageSize: pageSize ? pageSize : 10,
                })
              );
            })
            .catch((err) => {
              // console.log(err);
              message.error(err.response.data.error.message);
            });
        };
        return {
          key: item.id,
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
                  <Tag style={{ cursor: "pointer" }} color="red">
                    Chưa thanh toán
                  </Tag>
                </Popconfirm>
              </>
            ) : (
              <>
                <Tag style={{ cursor: "pointer" }} color="green">
                  Thanh toán
                </Tag>
              </>
            ),
          tongTien: formatMoney(item.attributes.tongTien),
          createdAt: item.attributes.createdAt.toString().slice(0, 10),
        };
      }))
    : null;
  // console.log(pn.meta);
  let paginate = pn.meta;
  paginate ? dispatch(setPageTotal(paginate.pagination.total)) : null;

  const fetchCTPN = () => {
    axios
      .get(`https://l3mshop.onrender.com/api/getCtPn?id_pn=${idPn}`)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        const result = data.map((item: any) => {
          return {
            product: item.product.tenSP,
            soluong: item.soluong,
            gia: parseInt(item.gia),
            key: item.product.id,
          };
        });
        // console.log(result);
        dispatch(fetchCtPnInView(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDataRow = async (props: any) => {
    setloading(true);
    dispatch(getIdPN(props.key));
    const idPn = props.key;
    await axios
      .get(`/api/getCtPn?id_pn=${idPn}`)
      .then((res) => {
        setloading(false);

        // console.log(res.data);
        const data = res.data;
        const result = data.map((item: any) => {
          return {
            key: item.product.id,
            product: item.product.tenSP,
            gia: parseInt(item.gia),
            soluong: item.soluong,
          };
        });
        // console.log(result);
        dispatch(fetchCtPnInView(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const expandedRowRender = () => {
    const columns: any = [
      { title: "Tên Sản Phẩm", dataIndex: "product", key: "product" },
      { title: "Giá", dataIndex: "gia", key: "gia" },
      { title: "Số lượng", dataIndex: "soluong", key: "soluong" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: (_: any, record: any) => {
          // console.log(record);

          const handleChange = () => {
            console.log(record);
            dispatch(openModal());
            dispatch(getInforModalCtPN(record));
            dispatch(getSpId(record.key ? record.key : record.idgetSP));
          };
          const confirm1 = () => {
            // console.log(record);
            axios
              .delete(`/api/delCtPn?phieu_nhap=${idPn}&product=${record.key}`)
              .then((res) => {
                console.log(res.data);
                res.status == 200 ? message.success(res.data.message) : null;
                fetchCTPN();
              })
              .catch((err) => {
                // console.log(err.response.data.error.message);
                message.error(err.response.data.error.message);
              });
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
                  onConfirm={confirm1}
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

    return (
      <Table
        columns={columns}
        dataSource={dataInView}
        pagination={false}
        loading={loading}
      />
    );
  };
 
  const columns: TableColumnsType<DataType> = [
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      
      title: "Tổng tiền",
      dataIndex: "tongTien",
      key: "tongTien",
      sorter: (a, b) => parseInt(a.tongTien) - parseInt(b.tongTien),
      showSorterTooltip: false
    },
    { title: "Ngày Tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record: any) => {
        // console.log(record.key);
        const confirm = async () => {
          await axios
            .delete(`/api/deletePN?idpn=${record.key}`)
            .then(function (response) {
              dispatch(
                fetchPN({
                  page: page ? page : 1,
                  pageSize: pageSize ? pageSize : 10,
                })
              );
              dispatch(getIdPN(null));
              message.success("Xóa thành công");
              // console.log(response);
            })
            .catch(function (error) {
              message.error(error.response.data.error.message);
              // console.log(error.response.data.error.message);
            });
        };
        const handlePrinter = async () => {
          console.log(record.key);
          const checkPrinter = record.status.props.children.props.children;
          if (checkPrinter == "Thanh toán") {
            const res = await axios.get(`/api/getCtPn?id_pn=${record.key}`);
            setInforPrinter({ inforPn: record, inforCTPN: res.data });
            setShow(true);
          } else {
            message.warning("phiếu nhập chưa thanh toán!");
          }
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
            <Tooltip title={"In phiếu xuất"}>
              <Button
                className="flex justify-center items-center"
                shape="circle"
                icon={<PrinterOutlined />}
                onClick={handlePrinter}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const onchange = (page: any, pageSize: any) => {
    dispatch(setPage(page));
    dispatch(setPageSide(pageSize));
    // console.log(page,pageSize);
  };
  return (
    <>
      {isOpen && (
        <Modal1 title="Sửa chi tiết phiếu nhập">
          <UpdateCTPN />
        </Modal1>
      )}
      <Modal
        title={"In phiếu Nhập"}
        centered
        open={show}
        footer={false}
        onCancel={() => setShow(false)}
      >
        <PrintPN data={inforPrinter} />
      </Modal>
      <Table
        columns={columns}
        dataSource={result}
        expandedRowKeys={expandedRowKeys}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => true,
          onExpand(expanded, record: any) {
            if (expanded) {
              setExpandedRowKeys([record.key]);
            } else {
              setExpandedRowKeys([]);
            }
            handleDataRow(record);
          },
        }}
        pagination={false}
        style={{ maxWidth: "100vw" }}
        scroll={{ x: true }}
        loading={status === "loading" ? true : false}
      />
      <div className="flex justify-end m-3">
        <Pagination
          defaultCurrent={1}
          onChange={onchange}
          total={totalPage}
          pageSize={pageSize ? pageSize : 10}
          responsive
        />
      </div>
    </>
  );
};

export default ListPN;
