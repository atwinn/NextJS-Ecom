import Divider1 from "@/component/devider";
import { Button, Card, Col, Input, Row, Tooltip,message } from "antd";
import * as React from "react";
import PhieuNhapTable from "./table-pn";
import { Typography } from "antd";
const { Title } = Typography;
import { AutoComplete } from "antd";
import TableChiTietPN from "./table-chi-tiet-pn";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import { fetchNcc, selectNcc } from "@/redux/nccSlice";
import { AppDispatch } from "@/redux/store";
import { addRow, deleteRow, getIdPN, getNccId } from "@/redux/tableSlice";
import axios from "axios";
export interface IAppProps {}

const ViewPN = (props: IAppProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { idNCC,idPn } = useSelector((store: any) => store.table);
  const ncc = useSelector(selectNcc);
  // console.log(ncc);
  React.useEffect(() => {
    dispatch(fetchNcc())
  },[dispatch])
  
  const birthday: Date = new Date();
  let result = []
  // console.log(result);
  
  ncc
  ? (result = ncc.data?.map((item: any) => {
    // console.log(item.attributes.tenNCC);
    return {
      id: item.id,
      tenNCC: item.attributes.tenNCC,
      diaChi: item.attributes.diaChi,
      sdt: item.attributes.sdt,
    };
  }))
  : null;
  // console.log(result);
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
  const renderItem = (id: string,title: string, count?: string) => ({
    id:id,
    value: title,
    label: count
  });
  const mangTenNCC = result ? result.map((ncc: any) => renderItem(ncc.id, ncc.tenNCC)) : [];
  // console.log(mangTenNCC);
const options = [
    {
      label: renderTitle("Nhà cung cấp"),
      options:mangTenNCC
    }
  ];
  const onSelect = (option: any) => {
    const NccId = mangTenNCC.find((item:any) => item.value === option);
    dispatch(getNccId(NccId.id))
    // console.log('onSelect', NccId.id);
  };
  
  // const dispatch = useDispatch() 
  // const addNCC = () => {
  //   dispatch(openModal())
  // }
  const addPN = () => {
    // console.log(idNCC);
    const data = {ncc:idNCC, user_id:72 }
    axios.post("/api/addPN",data).then((res) => {
      console.log(res.data); 
      dispatch(getIdPN(res.data.id))
      // setPN(res.data.id)
      message.success("thêm phiếu nhập thành công")
      dispatch(deleteRow())
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      {/* {isOpen &&  <Modal1 title='Thêm nhà cung cấp'><ModalAddNCC/></Modal1>} */}
      <Card>
        <Row gutter={16}>
          <Col md={3}>
            <Input disabled value={`Pn: ${idPn}`} />
          </Col>
          <Col md={8}>
            <div className="flex">
              <AutoComplete
                options={options}
                style={{ width: 300 }}
                onSelect={onSelect}
                // onSearch={(text) => setOptions(getPanelValue(text))}
                placeholder="nhà cung cấp"
              />
              <Tooltip title="Thêm nhà cung cấp">
              <Button className="ml-4"><Link href={pageRoutes.ncc_nsx.route}>Thêm</Link></Button>
              </Tooltip>
            </div>
          </Col>
          <Col md={6}>
            <Input disabled value={birthday.toString().slice(0, 25)} />
          </Col>
          <Col md={3}>
            <Button className="ml-4" onClick={addPN}>Thêm phiếu nhập</Button>
          </Col>
        </Row>
        <Divider1 name="Thêm phiếu nhập"/>
        <PhieuNhapTable />
        <Divider1 name='Chi tiết phiếu nhập'/>
        <TableChiTietPN/>
      </Card>
    </>
  );
}
export default ViewPN