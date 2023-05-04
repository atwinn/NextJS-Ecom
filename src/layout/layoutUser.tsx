"use client";
import React, { ReactNode, useState } from "react";
import { Layout, Row, Col } from "antd";
import Nav from "@/component/nav";
import Link from 'next/link';
import PageFooter from "@/component/footer";

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
            <PageFooter />
        </Layout>
    );

}
