"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import Nav from "@/component/nav";
import logo from '../assets/logoL3M.png'
import Image from 'next/image'

const { Header, Content, Footer } = Layout;
export function UserLayoutManager({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout>
                <Nav />
                <Content style={{ minHeight: "100vh" }}>
                    {children}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </>
    );

}
