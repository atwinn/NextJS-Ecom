import React from 'react'
import AddCate from './addCate'
import CateTable from './cateTable'
import Divider1 from '@/component/devider'

const CategoryAd = () => {
    return (
        <div className='p-5 space-y-3'>
            <Divider1 name="Quản lý loại sản phẩm" />
            <section className='bg-white rounded-lg p-5'>
                <AddCate />
            </section>
            <Divider1 name="Danh sách loại sản phẩm" />
            <section>
                <CateTable />
            </section>
        </div>
    )
}

export default CategoryAd