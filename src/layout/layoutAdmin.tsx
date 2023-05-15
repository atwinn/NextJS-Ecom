"use client";
import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import Menu1 from "@/component/menu"
import logo from '../assets/logoL3M.png'
import Image from 'next/image'
import PrivateRoute from "@/redux/constant/privateroute";
import Link from "next/link";
import { UserOutlined } from '@ant-design/icons'

const { Sider, Content, Footer } = Layout;

interface IProps {
  children: ReactNode;
}

export function LayoutManager({ children }: IProps) {
  const [collapsed, setCollapsed] = useState(false);
  const userName = typeof window !== "undefined" ? localStorage.getItem("username") : null
  return (
    <PrivateRoute>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Link href="/" className="flex justify-center">
            <Image src={logo} alt='' width={75} height={75} />
          </Link>
          <h3
            className="text-white mx-1 flex justify-center border-2 border-white p-2 rounded-lg truncate">
            {collapsed ? null : <UserOutlined className="mr-1" />}
            <span className="custom-text">{userName}</span>
          </h3>
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
    </PrivateRoute>
  );

}
