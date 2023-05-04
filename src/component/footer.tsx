import React from 'react'
import { Layout } from "antd";
import Link from 'next/link';

const { Footer } = Layout;
const PageFooter = () => {
    return (
        <Footer className="rounded-lg shadow m-4 bg-zinc-900">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="/" className="hover:underline">L3M SHOP</Link>. All Rights Reserved.
                </span>
                <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">

                    <Link href="/" className="mr-4 hover:underline md:mr-6 ">About</Link>

                    <Link href="/" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>

                    <Link href="/" className="mr-4 hover:underline md:mr-6">Licensing</Link>

                    <Link href="/" className="hover:underline">Contact</Link>

                </div>
            </div>
        </Footer>
    )
}

export default PageFooter