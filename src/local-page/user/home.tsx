import formatMoney from '@/component/formatMoney';
import { Carousel, Card, Row, Col, Button, Divider } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TrangChu = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchDataBestSeller = async () => {
            try {
                setLoading(true)
                const res = await axios.get("/api/bestseller");
                // console.log(res.data);
                if (res.status === 200) {
                    setLoading(false)
                    setData(res.data)
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchDataBestSeller()
    }, [])

    const result = data?.map(({ product }: any) => ({
        id: product.id,
        tenSP: product.tenSP,
        gia: product.gia,
        url: product.hinh.url,
    }));

    return (
        <div>
            <div className="mx-auto p-4">
                <Carousel autoplay className="mb-4">
                    <div>
                        <img src="https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                            alt="Slide 1"
                            className="w-full h-96 object-cover rounded-lg" />
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1681125282872-ecd5e684ecc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                            alt="Slide 2"
                            className="w-full h-96 object-cover rounded-lg" />
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1680695919630-39239c563fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt="Slide 3"
                            className="w-full h-96 object-cover rounded-lg" />
                    </div>
                </Carousel>
                <div className=''>
                    <Divider ></Divider>
                    <h1 className="custom-text text-2xl font-semibold mb-4 text-black">Sản phẩm nổi bật ( •̀ ω •́ )✧</h1>
                    <Card loading={loading}>
                        <Row gutter={[16, 16]}>
                            {result.map((item): any => {
                                return (
                                    <>
                                        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                                            <Card
                                                hoverable
                                                cover={<img src={item.url}
                                                    alt="Product"
                                                    className="h-48 object-cover" />}
                                                actions={[<Button type="primary">Thêm vào giỏ hàng</Button>]}
                                            >
                                                <Card.Meta title={item.tenSP} description={formatMoney(item.gia)} />
                                            </Card>
                                        </Col>
                                    </>
                                )
                            })}



                            {/* Các card sản phẩm khác tương tự */}
                        </Row>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TrangChu