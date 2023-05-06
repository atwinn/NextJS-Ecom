import React from 'react'
import { Layout } from "antd";
import Link from 'next/link';
import { pageRoutes } from '@/redux/constant/page-routes.constant';

const { Footer } = Layout;
const PageFooter = () => {
    return (
        <Footer className="rounded-lg shadow m-4 bg-zinc-900">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Bản quyền thuộc về <Link href="/" className="hover:underline">L3M SHOP</Link> @2023.
                </span>
                <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">

                    <Link href={pageRoutes.contact.route} className="mr-4 hover:underline md:mr-6 ">Liên hệ</Link>

                    <Link href={pageRoutes.checkGuarantee.route} className="mr-4 hover:underline md:mr-6">Kiểm tra bảo hành</Link>

                    <Link href={"/"} className="mr-4 hover:underline md:mr-6">Về chúng tôi</Link>

                </div>
            </div>
        </Footer>
    )
}

export default PageFooter