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
import { useDispatch } from "react-redux";
import { setfilterData } from "@/redux/productSlice";
const { Title } = Typography;

interface range {
    min: number;
    max: number;
}
const UserProdFilter = () => {
    const dispatch = useDispatch()
    const [range, setRange] = useState({ min: 0, max: 0 });
    const [defaultRange, setDefaultRange] = useState<range>();
    const [nsx, setNsx] = useState([]);
    const [loaiSp, setLoaiSP] = useState([]);
    const [valueNsx, setValueNSX] = useState<number | string>(0);
    const [valueLoai, setValueLoai] = useState<number | string>(0);
    const [load, setLoad] = useState<boolean>(false);
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
                    dispatch(setfilterData(res.data));
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
    const renderMinMax = async () => {
        await axios
            .get("/api/products/laymaxmin")
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setDefaultRange({min: parseInt(res.data.gia_min.gia), max: parseInt(res.data.gia_max.gia)})
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        renderLoaiSp();
        renderNSX();
        renderMinMax()
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
                <div className="relative">
                <Slider
                    step={100000}
                    // marks={marks}
                    range={{draggableTrack:true}}
                    defaultValue={[defaultRange ? defaultRange.min: 0, defaultRange ? defaultRange.max: 100]}
                    max={defaultRange ? defaultRange.max: 100}
                    min={defaultRange ? defaultRange.min : 0}
                    className="mr-7 ml-7"
                    onAfterChange={handleChange}
                />
                <span className="absolute top-[18px] left-[13px]">{formatMoney(range.min)}</span>
                <span className="absolute top-[13px] right-[13px]">{formatMoney(range.max)}</span>
                </div>
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
