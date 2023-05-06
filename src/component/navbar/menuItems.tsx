import { pageRoutes } from "@/redux/constant/page-routes.constant";
import { MenuProps } from "antd";
import Link from "next/link";
import { LaptopOutlined, AppstoreOutlined, UserOutlined, ContactsOutlined, CustomerServiceOutlined } from '@ant-design/icons'

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

export const items: MenuItem[] = [
    getItem(
        <Link href={pageRoutes.sanPhamUser.route}>Sản phẩm</Link>,
        "1",
        <LaptopOutlined />
    ),
    getItem(
        <Link href={pageRoutes.sanPhamUser.route}>Danh Mục</Link>,
        "2",
        <AppstoreOutlined />,
        [
            getItem(
                <Link href={pageRoutes.sanPhamUser.route}>Danh Mục 1</Link>,
                "1",
                <AppstoreOutlined />,
            ),
            getItem(
                <Link href={pageRoutes.sanPhamUser.route}>Danh Mục 2</Link>,
                "2",
                <AppstoreOutlined />,
            )
        ]
    ),
    getItem(
        <Link href={pageRoutes.userInfo.route}>Trang cá nhân</Link>,
        "3",
        <UserOutlined />
    ),
    getItem(
        <Link href={pageRoutes.contact.route}>Liên hệ</Link>,
        "4",
        <ContactsOutlined />
    ),
    getItem(
        <Link href={pageRoutes.checkGuarantee.route}>Kiểm tra bảo hành</Link>,
        "5",
        <CustomerServiceOutlined />
    )
];