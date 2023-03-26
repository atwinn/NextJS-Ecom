import Link from "next/link";
import React from "react";

interface title {
    route: React.ReactNode; title: string; key:string;
}
export const pageRoutes: { [key: string]: title } = {
    home: {
        route: <Link href={"/page-admin"}>Dashboard</Link>,
        title: 'Dashboard',
        key: "1",
    },
    nhanVien: {
        route: <Link href={"/page-admin/quan-ly-nhan-vien"}>Quản lý nhân viên</Link>,
        title: 'Quản lý nhân viên',
        key: "2",
    },
    sanPham: {
        route: <Link href={"/page-admin/quan-ly-san-pham"}>Quản lý Sản phẩm</Link>,
        title: 'Quản lý san pham',
        key: "3",
    },
};
