import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { usePathname } from 'next/navigation';
import { pageRoutes } from '@/redux/constant/page-routes.constant';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcum: React.FC = () => {
    const [title, setTitle] = useState<string>("")
    var pathName = usePathname();
    Object.keys(pageRoutes).forEach((obj: string) => {
        return (
            (pathName == pageRoutes[obj].route) ?
                pathName = pageRoutes[obj].title : null
        )
    })
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        setTimeout(() => setTitle(document.title)
            , 1000)
    }, [pathName])

    return (
        <div>
            {pathName === "Trang chủ"
                ? null
                : <div className='bg-white p-5 mt-3 mx-5 rounded-md'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link href="/">Trang chủ</Link>
                        </Breadcrumb.Item>
                        {
                            pathName === "Thanh toán"
                                ? <>
                                    <Breadcrumb.Item>
                                        <Link href="/cart">Giỏ hàng</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        {pathName}
                                    </Breadcrumb.Item>
                                </>
                                : pathName === `/sanpham/${id}`
                                    ? <>
                                        <Breadcrumb.Item>
                                            <Link href="/sanpham">Sản phẩm</Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            {title}
                                        </Breadcrumb.Item>
                                    </>
                                    : <Breadcrumb.Item>
                                        {pathName}
                                    </Breadcrumb.Item>
                        }
                    </Breadcrumb>
                </div>}
        </div>

    )
}

export default Breadcum;