"use client";
import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import Nav from "@/component/nav";

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
            <Footer>Footer</Footer>
        </Layout>
    );

}
