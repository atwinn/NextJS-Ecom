import React, { useEffect, useState } from 'react'
import ProdCard from '@/component/productCard'
import { Col, Pagination, Row, message, Skeleton } from 'antd'
import UserProdFilter from '@/component/product-filter'
import axios from 'axios'
import type { PaginationProps } from 'antd';
import { useSearchParams } from 'next/navigation'

const UserProduct = () => {
    const [prodData, setProdData] = useState([])
    const [showSearch, setShow] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const [paginate, setPaginate] = useState({
        page: 0,
        pageCount: 0,
        pageSize: 0,
        total: 0
    })
    const searchParams = useSearchParams()

    const fetchProd = async () => {
        setLoading(true)
        try {
            if (searchParams.has("search") && searchParams.get("search") !== "") {
                const searchQuery = searchParams.get("search")
                const res = await axios.get(`/api/products/tim-kiem?key=${searchQuery}`)
                setProdData(res.data)
                setShow(true)
                setLoading(false)
            } else if (searchParams.has("loai")) {
                const searchQuery = searchParams.get("loai")
                const res = await axios.get(`/api/products?filters[maLoai][id][$eq]=${searchQuery}&populate=*&pagination[page]=1&pagination[pageSize]=100`)
                setProdData(res.data.data)
                setShow(false)
                setPaginate(res.data.meta.pagination)
                setLoading(false)
            } else {
                const res = await axios.get("/api/products?pagination[page]=1&pagination[pageSize]=8&populate=*")
                setProdData(res.data.data)
                setShow(false)
                setPaginate(res.data.meta.pagination)
                setLoading(false)
            }
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
            setLoading(false)
            setShow(false)
        }
    }

    useEffect(() => {
        fetchProd()
    }, [searchParams])

    const pageChange: PaginationProps['onChange'] = async (page) => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/products?pagination[page]=${page}&pagination[pageSize]=8&populate=*`)
            setProdData(res.data.data)
            setPaginate(res.data.meta.pagination)
            setLoading(false)
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
            setLoading(false)
        }
    };

    return (
        <div className='p-5'>
            <Row gutter={[16, 16]}>
                <Col xs={0} lg={5}>
                    <UserProdFilter />
                </Col>
                <Col lg={15} className='p-4 bg-white rounded-md'>
                    {loading ? <Skeleton active />
                        :
                        !showSearch ?
                            <Row gutter={[16, 16]}>
                                {prodData && prodData.map((item: any) => (
                                    <Col xs={24} sm={12} lg={8} xl={6} key={item.id} className='flex justify-center'>
                                        <ProdCard
                                            name={item.attributes.tenSP}
                                            price={item.attributes.gia}
                                            image={item.attributes.hinh.data?.attributes.url
                                                ? item.attributes.hinh.data.attributes.url
                                                : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                                            id={item.id}
                                        />
                                    </Col>
                                ))
                                }
                            </Row>
                            : <Row gutter={[16, 16]}>
                                {prodData && prodData.map((item: any) => (
                                    <Col xs={24} sm={12} lg={8} xl={6} key={item.id} className='flex justify-center'>
                                        <ProdCard
                                            name={item.tenSP}
                                            price={item.gia}
                                            image={item.hinh?.url
                                                ? item.hinh.url
                                                : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                                            id={item.id}
                                        />
                                    </Col>
                                ))
                                }
                            </Row>
                    }
                    {showSearch
                        ? null
                        : <Pagination
                            total={paginate.total}
                            pageSize={paginate.pageSize}
                            current={paginate.page}
                            showTotal={(total) => `${total} sản phẩm`}
                            hideOnSinglePage
                            showSizeChanger={false}
                            className='mt-10 text-center'
                            onChange={pageChange}
                        />}
                </Col>
            </Row>
        </div>
    )
}

export default UserProduct