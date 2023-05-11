import { Carousel, Card, Row, Col, Divider } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProdCard from "@/component/productCard";
import CarouselBestSell from "@/component/carosel/carousel";
const TrangChu = () => {
  const [data, setData] = useState([]);
  const [dataLoaiPC, setDataLoaiPC] = useState([]);
  const [dataLoaiLap, setDataLoaiLap] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchDataLoaiPC = async () => {
    try {
      // setLoading(true)
      const res = await axios.get(
        "/api/products?filters[maLoai][id][$eq]=1&populate=*"
      );
      console.log(res.data.data);
      if (res.status === 200) {
        // setLoading(false)
        setDataLoaiPC(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDataLoaiLaptop = async () => {
    try {
      // setLoading(true)
      const res = await axios.get(
        "/api/products?filters[maLoai][id][$eq]=2&populate=*"
      );
      console.log(res.data.data);
      if (res.status === 200) {
        // setLoading(false)
        setDataLoaiLap(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDataBestSeller = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/bestseller");
      // console.log(res.data);
      if (res.status === 200) {
        setLoading(false);
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDataBestSeller();
    fetchDataLoaiPC();
    fetchDataLoaiLaptop();
  }, []);

  const resultLoaiPC = dataLoaiPC?.map((item: any) => {
    // console.log(item.attributes.hinh.data?.attributes?.url);
    return {
      id: item.id,
      tenSP: item.attributes.tenSP,
      gia: item.attributes.gia,
      hinh: item.attributes.hinh.data?.attributes?.url,
    };
  });
  const resultLoaiLap = dataLoaiLap?.map((item: any) => {
    return {
      id: item.id,
      tenSP: item.attributes.tenSP,
      gia: item.attributes.gia,
      hinh: item.attributes.hinh.data?.attributes?.url,
    };
  });

  return (
    <div>
      <div className="mx-auto p-4">
        <Carousel lazyLoad="progressive" autoplay className="mb-4">
          <div>
            <img
              src="https://xgear.net/wp-content/uploads/2023/05/Gia-re-zdach.jpg"
              alt="Slide 1"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="https://xgear.net/wp-content/uploads/2023/04/Nang-cap-la-phai-gap.jpg"
              alt="Slide 2"
              className="w-full h-96 object-cover rounded-lg"
              
            />
          </div>
          <div>
            <img
              src="https://xgear.net/wp-content/uploads/2023/04/Helios-Neo-16.jpg"
              alt="Slide 3"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </Carousel>
        <div className="">
          <Divider></Divider>
          <Card loading={loading}>
            <h1 className="custom-text text-2xl font-semibold mb-4 text-black">
              Sản phẩm nổi bật ( •̀ ω •́ )✧
            </h1>
            
            <CarouselBestSell data={data}/>
              
          </Card>
          <Divider></Divider>
          <Card loading={loading}>
            <h1 className="custom-text text-2xl font-semibold mb-4 text-black">
              👉 PC (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
            </h1>
            <Row gutter={[16, 16]}>
              {resultLoaiPC.map((item): any => {
                return (
                  <>
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                      <ProdCard
                        name={item.tenSP}
                        price={item.gia}
                        image={
                          item.hinh
                            ? item.hinh
                            : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        }
                        id={item.id}
                      />
                    </Col>
                  </>
                );
              })}
              {/* Các card sản phẩm khác tương tự */}
            </Row>
          </Card>
          <Divider></Divider>
          <Card loading={loading}>
            <h1 className="custom-text text-2xl font-semibold mb-4 text-black">
              👉 Laptop (〃￣︶￣)人(￣︶￣〃)
            </h1>
            <Row gutter={[16, 16]}>
              {resultLoaiLap.map((item): any => {
                return (
                  <>
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                      <ProdCard
                        name={item.tenSP}
                        price={item.gia}
                        image={
                          item.hinh
                            ? item.hinh
                            : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        }
                        id={item.id}
                      />
                    </Col>
                  </>
                );
              })}
              {/* Các card sản phẩm khác tương tự */}
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrangChu;
