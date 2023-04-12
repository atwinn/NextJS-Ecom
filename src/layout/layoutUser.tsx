"use client";
import React, { ReactNode, useState } from "react";
import { Layout, Row, Col } from "antd";
import Nav from "@/component/nav";
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

interface IProps {
    children: ReactNode;
}

export function UserLayoutManager({ children }: IProps) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Nav />
            <Content style={{ minHeight: "100vh" }}>
                {children}
            </Content>
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
        </Layout>
    );

}
