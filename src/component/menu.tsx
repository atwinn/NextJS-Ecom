"use client";
import * as React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { FileOutlined, PieChartOutlined } from "@ant-design/icons";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import Link from "next/link";
export interface IMenuProps { }
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href={pageRoutes.home.route}>Dashboard</Link>,
    "1",
    <PieChartOutlined />
  ),
  getItem(
    <Link href={pageRoutes.nhanVien.route}>Quản lý nhân viên</Link>,
    "2",
    <FileOutlined />
  ),
  getItem(
    <Link href={pageRoutes.sanPham.route}>Quản lý sản phẩm</Link>,
    "3",
    <FileOutlined />
  ),
  getItem(
    "##",
    "4",
    <FileOutlined />
  ),
];

export default function Menu1(props: IMenuProps) {
  return (
    <div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
