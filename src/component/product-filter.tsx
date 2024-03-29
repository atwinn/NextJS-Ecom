import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import { Typography, Space, Checkbox, Row, Col, Button, Divider } from "antd";
// import type { SliderMarks } from "antd/es/slider";
import formatMoney from "./formatMoney";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setfilterData } from "@/redux/productSlice";
const { Title } = Typography;
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { FilterOutlined, LaptopOutlined } from '@ant-design/icons'
interface range {
    min: number;
    max: number;
}
const UserProdFilter = () => {
    const dispatch = useDispatch();
    const [defaultRange, setDefaultRange] = useState<range>();
    const [nsx, setNsx] = useState([]);
    const [loaiSp, setLoaiSP] = useState([]);
    const [valueNsx, setValueNSX] = useState<any>([]);
    const [valueLoai, setValueLoai] = useState<any>([]);
    const [load, setLoad] = useState<boolean>(false);
    const [range, setRange] = useState({ min: 0, max: 0 });
    useEffect(() => {
        renderLoaiSp();
        renderNSX();
        renderMinMax();
    }, []);
    const handleChange = (props: any) => {
        console.log(props);
        setRange({ min: props[0], max: props[1] });
    };
    // const setParamOnUrl = (paramName: string, paramValue: string) => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     urlParams.set(paramName, paramValue);
    //     window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    // }
    function setParamOnUrl(paramName:string, paramValue:any) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('search') ) {
          urlParams.delete('search');
        }
        
        if (Array.isArray(paramValue)) {
            urlParams.set(paramName, paramValue.join(','));
          } else {
            urlParams.set(paramName, paramValue);
          }
        
        const newUrl = `${window.location.pathname}?${urlParams}`;
        window.history.replaceState({}, '', newUrl);
      }
    const getParamFromUrl = (paramName: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(paramName);
    }
    const filter = async () => {
        setParamOnUrl("minP", `${range.min == 0 ? (defaultRange ? defaultRange.min : null) : range.min}`)
        setParamOnUrl("maxP", `${range.max == 0 ? (defaultRange ? defaultRange.max : null) : range.max}`)
        setParamOnUrl("maLoai",`${valueLoai.length == 0 ? 0 : valueLoai}`)
        setParamOnUrl("maNSX",`${valueNsx.length == 0 ? 0 : valueNsx}`)
        // console.log(`/api/products/sortSP?minP=${range.min}&maxP=${range.max ==0 ? defaultRange?.max :range.max}&maLoai=${valueLoai.length == 0 ? 0 : valueLoai.join(",") }&maNSX=${valueNsx.length == 0 ? 0 : valueNsx.join(",") }`);
        const queryMin = getParamFromUrl("minP")
        const queryMax = getParamFromUrl("maxP")
        const queryMaLoai = getParamFromUrl("maLoai")
        const queryMaNsx = getParamFromUrl("maNSX")
        setLoad(true);
        await axios
            .get(
                `/api/products/sortSP?minP=${queryMin
                }&maxP=${queryMax
                }&maLoai=${queryMaLoai}&maNSX=${queryMaNsx
                }`
                // `/api/products/sortSP?minP=${range.min == 0 ? (defaultRange ? defaultRange.min : null) : range.min
                // }&maxP=${range.max == 0 ? (defaultRange ? defaultRange.max : null) : range.max
                // }&maLoai=${valueLoai.length == 0 ? 0 : valueLoai.join(",")}&maNSX=${valueNsx.length == 0 ? 0 : valueNsx.join(",")
                // }`
            )
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setLoad(false);
                    dispatch(setfilterData(res.data));
                }
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };
    const renderNSX = async () => {
        await axios
            .get("/api/nsxes?pagination[page]=1&pagination[pageSize]=100")
            .then((res) => {
                // console.log(res);
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
                // console.log(res);
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
                // console.log(res);
                if (res.status == 200) {
                    setDefaultRange({
                        min: parseInt(res.data.gia_min.gia),
                        max: parseInt(res.data.gia_max.gia),
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onChangeNSX = (checkedValues: CheckboxValueType[]) => {
        setValueNSX(checkedValues);
    };
    const onChangeLoai = (checkedValues: CheckboxValueType[]) => {
        console.log(checkedValues);
        setValueLoai(checkedValues);
    };
    return (
        <div className="bg-white p-4 rounded-md">
            <Space direction="vertical" size="middle" style={{ display: "flex" }}>
                <Title level={3}><FilterOutlined className="ml-2 mr-3" />Bộ lọc sản phẩm</Title>
                <div className="relative">
                    <Slider
                        step={100000}
                        range={{ draggableTrack: true }}
                        defaultValue={[
                            defaultRange ? defaultRange.min : 0,
                            defaultRange ? defaultRange?.max : 1000000000,
                        ]}
                        max={defaultRange ? defaultRange.max : 100}
                        min={defaultRange ? defaultRange.min : 0}
                        tooltip={{ open: false }}
                        className="mr-7 ml-7"
                        onAfterChange={handleChange}
                    />
                    <span className="absolute top-[17px] left-[13px] text-black font-semibold mt-2">
                        {range.min != 0
                            ? formatMoney(range.min)
                            : formatMoney(defaultRange?.min)}
                    </span>
                    <span className="absolute top-[17px] right-[13px] text-black font-semibold mt-2">
                        {range.max != 0
                            ? formatMoney(range.max)
                            : formatMoney(defaultRange?.max)}
                    </span>
                </div>
                <Divider>Loại sản phẩm</Divider>
                <Checkbox.Group style={{ width: "100%" }} onChange={onChangeLoai}>
                    <Row gutter={16}>
                        {loaiSp
                            ? loaiSp.map((item: any) => {
                                return (
                                    <>
                                        <Col key={item.id} span={10}>
                                            <Space direction="vertical">
                                                <Checkbox value={item.id}>
                                                    {item.attributes.tenLoai}
                                                </Checkbox>
                                            </Space>
                                        </Col>
                                    </>
                                );
                            })
                            : null}
                    </Row>
                </Checkbox.Group>
                <Divider>Nhà sản xuất</Divider>
                <Checkbox.Group style={{ width: "100%" }} onChange={onChangeNSX}>
                    <Row gutter={16}>
                        {nsx
                            ? nsx.map((item: any) => {
                                return (
                                    <>
                                        <Col key={item.id} span={10}>
                                            <Space direction="vertical">
                                                <Checkbox value={item.id}>
                                                    {item.attributes.tenNSX}
                                                </Checkbox>
                                            </Space>
                                        </Col>
                                    </>
                                );
                            })
                            : null}
                    </Row>
                </Checkbox.Group>
                <Divider></Divider>
                <div className="flex lg:justify-end">
                    <Button
                        className="-mt-5"
                        onClick={filter}
                        loading={load}
                        danger
                    >
                        <LaptopOutlined />Lọc sản phẩm
                    </Button>
                    {/* <Button className="bg-red-600 text-white" onClick={handleReset}>Reset Lọc</Button> */}
                </div>
            </Space>
        </div>
    );
};

export default UserProdFilter;
