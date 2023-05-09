import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import {
    Typography,
    Space,
    Checkbox,
    Row,
    Col,
    Button,
    Divider,
    Radio,
} from "antd";
import type { SliderMarks } from "antd/es/slider";
import formatMoney from "./formatMoney";
import axios from "axios";
const { Title } = Typography;
const UserProdFilter = ({ getSP }: any) => {
    const [range, setRange] = useState({ min: 0, max: 100000000 });
    const [nsx, setNsx] = useState([]);
    const [loaiSp, setLoaiSP] = useState([]);
    const [valueNsx, setValueNSX] = useState<number | string>(0);
    const [valueLoai, setValueLoai] = useState<number | string>(0);
    const [load, setLoad] = useState<boolean>(false);
    const marks: SliderMarks = {
        0: range ? formatMoney(range.min) : "0",
        100000000: range ? formatMoney(range.max) : "100000000",
    };
    const handleChange = (props: any) => {
        setRange({ min: props[0], max: props[1] });
    };
    const filter = async () => {
        setLoad(true)
        await axios
            .get(
                `/api/products/sortSP?minP=${range.min}&maxP=${range.max}&maLoai=${valueLoai}&maNSX=${valueNsx}`
            )
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setLoad(false)
                    getSP(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const renderNSX = async () => {
        await axios
            .get(
                "https://l3mshop.onrender.com/api/nsxes?pagination[page]=1&pagination[pageSize]=100"
            )
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setNsx(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const renderLoaiSp = async () => {
        await axios
            .get("/api/loaiSps")
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setLoaiSP(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        renderLoaiSp();
        renderNSX();
    }, []);


    const onChangeNSX = (e: any) => {
        setValueNSX(e.target.value);
    };
    const onChangeLoai = (e: any) => {
        setValueLoai(e.target.value);
    };
    const handleReset = () => {
        setValueNSX(0)
        setValueLoai(0)
    };
    return (
        <div className="bg-white p-4 rounded-md">
            <Space direction="vertical" size="large" style={{ display: "flex" }}>
                <Title level={2}>Bộ lọc sản phẩm</Title>
                <Slider
                    step={100000}
                    marks={marks}
                    range={{ draggableTrack: true }}
                    defaultValue={[0, 100000000]}
                    max={100000000}
                    className="mr-7 ml-7"
                    onChange={handleChange}
                />
                <Divider>Loại sản phẩm</Divider>
                <Checkbox.Group style={{ width: "100%" }}>
                    <Row gutter={16}>
                        {loaiSp
                            ? loaiSp.map((item: any) => {
                                return (
                                    <>
                                        <Col key={item.id} span={10}>
                                            <Radio.Group onChange={onChangeLoai} value={valueLoai}>
                                                <Space direction="vertical">
                                                    <Radio value={item.id}>{item.attributes.tenLoai}</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Col>
                                    </>
                                );
                            })
                            : null}
                    </Row>
                </Checkbox.Group>
                <Divider>Nhà sản xuất</Divider>
                <Checkbox.Group style={{ width: "100%" }}>
                    <Row gutter={16}>
                        {nsx
                            ? nsx.map((item: any) => {
                                return (
                                    <>
                                        <Col key={item.id} span={10}>
                                            <Radio.Group onChange={onChangeNSX} value={valueNsx}>
                                                <Space direction="vertical">
                                                    <Radio value={item.id}>{item.attributes.tenNSX}</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Col>
                                    </>
                                );
                            })
                            : null}
                    </Row>
                </Checkbox.Group>
                <div className="flex">
                <Button className="mr-3 bg-green-600 text-white" onClick={filter} loading={load}>Lọc</Button>
                <Button className="bg-red-600 text-white" onClick={handleReset}>Reset Lọc</Button>
                </div>
            </Space>
        </div>
    );
};

export default UserProdFilter;
