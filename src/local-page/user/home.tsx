import formatMoney from "@/component/formatMoney";
import { Carousel, Card, Row, Col, Button, Divider } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { EllipsisOutlined, ShoppingCartOutlined } from "@ant-design/icons";
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

  const result = data?.map(({ product }: any) => ({
    id: product.id,
    tenSP: product.tenSP,
    gia: product.gia,
    url: product.hinh.url,
  }));
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
  const rowRef = useRef<HTMLDivElement>(null);
  const handleWheel = (event: any) => {
    event.preventDefault();
    const container = rowRef.current;

    if (container) {
      const containerScrollPosition = container.scrollLeft;

      container.scrollTo({
        top: 0,
        left: containerScrollPosition + event.deltaY,
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <div className="mx-auto p-4">
        <Carousel autoplay className="mb-4">
          <div>
            <img
              src="https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
              alt="Slide 1"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1681125282872-ecd5e684ecc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              alt="Slide 2"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1680695919630-39239c563fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
            <Row
              gutter={[16, 16]}
              wrap={false}
              style={{ overflowX: "auto" }}
              onWheel={handleWheel}
              ref={rowRef}
            >
              {result.map((item): any => {
                return (
                  <>
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                      <Card
                        hoverable
                        cover={
                          <img
                            src={item.url}
                            alt="Product"
                            className="h-48 object-cover"
                          />
                        }
                        actions={[
                          <ShoppingCartOutlined key="setting" />,
                          <EllipsisOutlined key="ellipsis" />,
                        ]}
                      >
                        <Card.Meta
                          title={item.tenSP}
                          description={formatMoney(item.gia)}
                        />
                      </Card>
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
              👉 PC (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
            </h1>
            <Row
              gutter={[16, 16]}
            >
              {resultLoaiPC.map((item): any => {
                return (
                  <>
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                      <Card
                        hoverable
                        cover={
                          <img
                            src={item.hinh}
                            alt="Product"
                            className="h-48 object-cover"
                          />
                        }
                        actions={[
                          <ShoppingCartOutlined key="setting" />,
                          <EllipsisOutlined key="ellipsis" />,
                        ]}
                      >
                        <Card.Meta
                          title={item.tenSP}
                          description={formatMoney(item.gia)}
                        />
                      </Card>
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
            <Row
              gutter={[16, 16]}
            >
              {resultLoaiLap.map((item): any => {
                return (
                  <>
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                      <Card
                        hoverable
                        cover={
                          <img
                            src={item.hinh}
                            alt="Product"
                            className="h-48 object-cover"
                          />
                        }
                        actions={[
                          <ShoppingCartOutlined key="setting" />,
                          <EllipsisOutlined key="ellipsis" />,
                        ]}
                      >
                        <Card.Meta
                          title={item.tenSP}
                          description={formatMoney(item.gia)}
                        />
                      </Card>
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
