import React, { useEffect, useState } from 'react'
import ProdCard from '@/component/productCard'
import { Col, Row, Divider } from 'antd'
import UserProdFilter from '@/component/product-filter'
import axios from 'axios'

const product = [
    {
        name: "Acer",
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        price: "11000000"
    },
    {
        name: "Asus",
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        price: "11000000"
    },
    {
        name: "Lenovo",
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        price: "11000000"
    },
    {
        name: "Daikin",
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        price: "11000000"
    },
    {
        name: "HP",
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        price: "11000000"
    },
    {
        name: "Dell",
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        price: "11000000"
    },
    {
        name: "Telnet",
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        price: "11000000"
    }
]



const UserProduct = () => {

    const [prodData, setProdData] = useState([])

    useEffect(() => {
        axios.get("https://l3mshop.onrender.com/api/products?populate=*").then((res) => {
            if (res.status === 200) {
                setProdData(res.data.data)
            }
        })
    }, [])

    console.log(prodData);


    return (
        <div className='p-5'>
            <Row gutter={16}>
                <Col xs={0} lg={5}>
                    <UserProdFilter />
                </Col>
                <Col xs={0} lg={1}></Col>
                <Col lg={18}>
                    <Row gutter={[16, 16]}>
                        {prodData && prodData.map((item: any) => (
                            <Col xs={12} lg={8} xl={6} key={item.id}>
                                <ProdCard name={item.attributes.tenSP} price={item.attributes.gia} image="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                            </Col>
                        ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default UserProduct