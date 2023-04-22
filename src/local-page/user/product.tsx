import React, { useEffect, useState } from 'react'
import ProdCard from '@/component/productCard'
import { Col, Pagination, Row, message } from 'antd'
import UserProdFilter from '@/component/product-filter'
import axios from 'axios'
import type { PaginationProps } from 'antd';

const UserProduct = () => {
    const [prodData, setProdData] = useState([])
    const [paginate, setPaginate] = useState({
        page: 0,
        pageCount: 0,
        pageSize: 0,
        total: 0
    })

    useEffect(() => {
        axios.get("/api/products?pagination[page]=1&pagination[pageSize]=10&populate=*").then((res) => {
            if (res.status === 200) {
                setProdData(res.data.data)
                setPaginate(res.data.meta.pagination)
            }
        })
    }, [])

    const pageChange: PaginationProps['onChange'] = (page) => {
        axios.get(`/api/products?pagination[page]=${page}&pagination[pageSize]=10&populate=*`).then((res) => {
            if (res.status === 200) {
                setProdData(res.data.data)
                setPaginate(res.data.meta.pagination)
            }
        })
    };

    return (
        <div className='p-5'>
            <Row gutter={[16, 16]}>
                <Col xs={0} lg={6}>
                    <UserProdFilter />
                </Col>
                <Col lg={18} className='p-4 bg-white rounded-md'>
                    <Row gutter={[16, 16]}>
                        {prodData && prodData.map((item: any) => (
                            <Col xs={24} sm={12} lg={8} xl={6} key={item.id} className='flex justify-center'>
                                <ProdCard
                                    name={item.attributes.tenSP}
                                    price={item.attributes.gia}
                                    // image="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    image={item.attributes.hinh.data?.attributes.url
                                        ? item.attributes.hinh.data.attributes.url
                                        : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                                    id={item.id}
                                />
                            </Col>
                        ))
                        }
                    </Row>
                    <Pagination
                        total={paginate.total}
                        pageSize={paginate.pageSize}
                        current={paginate.page}
                        showTotal={(total) => `${total} sản phẩm`}
                        hideOnSinglePage
                        showSizeChanger={false}
                        className='mt-10 text-center'
                        onChange={pageChange}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default UserProduct