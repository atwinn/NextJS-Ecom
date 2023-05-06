"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { FileOutlined, PieChartOutlined, ContainerOutlined, AppstoreOutlined } from "@ant-design/icons";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import Link from "next/link";
import { getCookie } from "../../cookies";
import React, { useState, useEffect } from "react";
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
    <AppstoreOutlined />
  ),
  getItem(
    <Link href={pageRoutes.orderManage.route}>Quản lý đơn hàng</Link>,
    "4",
    <ContainerOutlined />
  ),
  getItem(
    <Link href={pageRoutes.account.route}>Quản lý tài khoản</Link>,
    "5",
    <ContainerOutlined />
  ),
  getItem(
    <Link href={pageRoutes.phieuNhap.route}>Phiếu nhập</Link>,
    "6",
    <ContainerOutlined />
  ),
  getItem(
    <Link href={pageRoutes.ncc_nsx.route}>Đối tác</Link>,
    "7",
    <ContainerOutlined />
  ),
  getItem(
    <Link href={pageRoutes.contactAdmin.route}>Liên lạc</Link>,
    "8",
    <ContainerOutlined />
  ),
];

export default function Menu1(props: IMenuProps) {
  const [roleId, setRoleId] = useState<string>()
  useEffect(() => {
    setRoleId(getCookie("role"))
  }, [])

  const filteredItems = items.filter(item => {
    if (roleId === "3") {
      return ["1", "3", "4","8"].includes(item?.key?.toString() ?? '');
    } else if (roleId === "4") {
      return ["1", "3", "4", "6", "7"].includes(item?.key?.toString() ?? '');
    } else if (roleId === "6") {
      return ["1", "2", "5"].includes(item?.key?.toString() ?? '');
    }
    return true;
  });

  return (
    <div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={filteredItems}
      />
    </div>
  );
}
