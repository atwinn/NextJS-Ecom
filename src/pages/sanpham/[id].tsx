import React, { useEffect } from 'react'
import ProductDetail from '@/local-page/user/product-detail'
import { UserLayoutManager } from '@/layout/layoutUser';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchDetail } from '@/redux/detailProdSlice';

const DetailPage = () => {

    return (
        <div>
            <ProductDetail />
        </div>
    )
}

export default DetailPage
DetailPage.PageLayout = UserLayoutManager;