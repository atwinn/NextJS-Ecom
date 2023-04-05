"use client";
import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import Menu1 from "@/component/menu"
import logo from '../assets/logoL3M.png'
import Image from 'next/image'

const { Sider, Content, Footer } = Layout;

interface IProps {
  children: ReactNode;
}

export function LayoutManager({ children }: IProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Image src={logo} alt='' width={50} height={50} />
        <Menu1 />
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>L3M Manager</Footer>
        </Layout>
      </Layout>
    </Layout>
  );

}
