"use client";
import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import Nav from "@/component/nav";
import PageFooter from "@/component/footer";
import dynamic from "next/dynamic";
const Breadcum = dynamic(() => import('@/component/breadcum'), {
    ssr: false
});

const { Content } = Layout;

interface IProps {
    children: ReactNode;
}

export function UserLayoutManager({ children }: IProps) {

    return (
        <Layout>
            <Nav />
            <Breadcum />
            <Content style={{ minHeight: "100vh" }}>
                {children}
            </Content>
            <PageFooter />
        </Layout>
    );

}
