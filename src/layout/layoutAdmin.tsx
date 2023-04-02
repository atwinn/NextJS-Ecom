"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import Menu1 from "@/component/menu";
import * as logo from "./logoL3M.png"

const { Sider, Content, Footer } = Layout;
export function LayoutManager({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            backgroundImage: `url(${logo})`,
          }}
        />
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
