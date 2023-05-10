import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {  Col } from "antd";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import ProdCard from "../productCard";

export default function CarouselBestSell({data}:any) {

  const result = data?.map(({ product }: any) => ({
    id: product.id,
    tenSP: product.tenSP,
    gia: product.gia,
    url: product.hinh.url,
  }));
  
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={true}      
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          990: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          2000: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        
      >
        {/* <Col  xs={24} sm={12} md={8} lg={6}> */}
        {result.map((item:any) => {
                return (
                  <>
                    <SwiperSlide   key={item.id}>
                      <ProdCard
                        name={item.tenSP}
                        price={item.gia}
                        image={
                          item.url
                            ? item.url
                            : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        }
                        id={item.id}
                      />
                    </SwiperSlide>
                  </>
                );
              })}
              {/* </Col> */}
        
      </Swiper>
    </>
  );
}