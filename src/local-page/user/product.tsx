import React, { useEffect, useState } from 'react'
import ProdCard from '@/component/productCard'
import { Col, Pagination, Row } from 'antd'
import UserProdFilter from '@/component/product-filter'
import axios from 'axios'

const UserProduct = () => {
    const [prodData, setProdData] = useState([])
    const [paginate, setPaginate] = useState({
        page: 0,
        pageCount: 0,
        pageSize: 0,
        total: 0
    })

    useEffect(() => {
        axios.get("https://l3mshop.onrender.com/api/products?populate=*").then((res) => {
            if (res.status === 200) {
                setProdData(res.data.data)
                setPaginate(res.data.meta)
            }
        })
    }, [])

    return (
        <div className='p-5'>
            <Row gutter={32}>
                <Col xs={0} lg={6}>
                    <UserProdFilter />
                </Col>
                <Col lg={18} className='p-5 bg-white rounded-md'>
                    <Row gutter={[16, 16]}>
                        {prodData && prodData.map((item: any) => (
                            <Col xs={12} lg={8} xl={6} key={item.id}>
                                <ProdCard
                                    name={item.attributes.tenSP}
                                    price={item.attributes.gia}
                                    image="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            </Col>
                        ))
                        }
                    </Row>
                    <Pagination
                        total={paginate.total}
                        pageSize={10}
                        showTotal={(total) => `${total} sản phẩm`}
                        hideOnSinglePage
                        showSizeChanger={false}
                        className='mt-10 text-center'
                    />
                </Col>
            </Row>
        </div>
    )
}

export default UserProduct