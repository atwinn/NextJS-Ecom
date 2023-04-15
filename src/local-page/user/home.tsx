import { Carousel, Card, Row, Col, Button } from 'antd';

const TrangChu = () => {
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
                    <h1 className="text-2xl font-semibold mb-4 text-black">Sản phẩm nổi bật</h1>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={<img src="https://plus.unsplash.com/premium_photo-1675237625772-73e3eddf0abd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt="Product 1"
                                    className="h-48 object-cover" />}
                                actions={[<Button type="primary">Thêm vào giỏ hàng</Button>]}
                            >
                                <Card.Meta title="Sản phẩm 1" description="Mô tả sản phẩm 1" />
                            </Card>
                        </Col>
                        {/* Các card sản phẩm khác tương tự */}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default TrangChu