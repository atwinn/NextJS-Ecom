import React, { useEffect, useState } from 'react'
import ProdCard from '@/component/productCard'
import { Col, Pagination, Row, message, Skeleton } from 'antd'
import UserProdFilter from '@/component/product-filter'
import axios from 'axios'
import type { PaginationProps } from 'antd';

const UserProduct = () => {
    const [prodData, setProdData] = useState([])
    const [loading, setLoading] = useState(true)
    const [paginate, setPaginate] = useState({
        page: 0,
        pageCount: 0,
        pageSize: 0,
        total: 0
    })

    const fetchProd = async () => {
        try {
            const res = await axios.get("/api/products?pagination[page]=1&pagination[pageSize]=10&populate=*")
            setProdData(res.data.data)
            setPaginate(res.data.meta.pagination)
            setLoading(false)
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 400 || error.response.status === 403 || error.response.status === 404 || error.response.status === 405 || error.response.status === 500) {
                    message.open({
                        type: 'error',
                        content: error.response.data.error.message,
                    });
                }
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProd()
    }, [])

    const pageChange: PaginationProps['onChange'] = async (page) => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/products?pagination[page]=${page}&pagination[pageSize]=10&populate=*`)
            setProdData(res.data.data)
            setPaginate(res.data.meta.pagination)
            setLoading(false)
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 400 || error.response.status === 403 || error.response.status === 404 || error.response.status === 405 || error.response.status === 500) {
                    message.open({
                        type: 'error',
                        content: error.response.data.error.message,
                    });
                }
            }
            setLoading(false)
        }
    };

    return (
        <div className='p-5'>
            <Row gutter={[16, 16]}>
                <Col xs={0} lg={6}>
                    <UserProdFilter />
                </Col>
                <Col lg={18} className='p-4 bg-white rounded-md'>
                    {loading ? <Skeleton active />
                        : <Row gutter={[16, 16]}>
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
                    }
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