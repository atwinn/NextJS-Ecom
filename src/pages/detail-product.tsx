import React from 'react'
import ProductDetail from '@/local-page/user/product-detail'
import { UserLayoutManager } from '@/layout/layoutUser';

const DetailPage = () => {
    return (
        <div>
            <ProductDetail />
        </div>
    )
}

export default DetailPage
DetailPage.PageLayout = UserLayoutManager;