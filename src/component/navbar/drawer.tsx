import React, { useEffect, useState } from 'react';
import { Button, Tag, Drawer, Menu, message } from 'antd';
import { AiOutlineMenu } from 'react-icons/ai'
import { LogoutOutlined, LoginOutlined, LaptopOutlined, AppstoreOutlined, UserOutlined, ContactsOutlined, CustomerServiceOutlined, InsertRowBelowOutlined } from '@ant-design/icons'
import { MenuProps } from "antd";
import Link from 'next/link';
import { pageRoutes } from '@/redux/constant/page-routes.constant';
import { selectCategory, selectCategoryStatus } from '@/redux/categorySlice';
import { useSelector } from 'react-redux';
import { usePathname, useSearchParams } from 'next/navigation';

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        label,
        key,
        icon,
        children,
    } as MenuItem;
}

const RespNav: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [userAuth, setUserAuth] = useState("")
    const category = useSelector(selectCategory)
    const status = useSelector(selectCategoryStatus)
    const searchParams = useSearchParams()
    var pathName = usePathname();
    Object.keys(pageRoutes).forEach((obj: string) => {
        return (
            (pathName == pageRoutes[obj].route) ?
                pathName = pageRoutes[obj].key : null
        )
    })

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (searchParams.has("action")) setUserAuth("")
        setUserAuth(storedUsername || "")
    }, [searchParams]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const items: MenuItem[] = [
        getItem(
            <Link href={pageRoutes.sanPhamUser.route}>Sản phẩm</Link>,
            pageRoutes.sanPhamUser.key,
            <LaptopOutlined />
        ),
        getItem(
            "Danh Mục",
            "2",
            <AppstoreOutlined />,
            category.data !== "null" && status === "success"
                ? category.data.map((item: any) => (
                    getItem(
                        <Link key={`category-${item.id}`} href={`/sanpham?loai=${item.id}`}>{item.attributes.tenLoai}</Link>,
                        `category-${item.id}`,
                        <InsertRowBelowOutlined />,
                    )
                ))
                : null
        ),
        getItem(
            <Link href={pageRoutes.userInfo.route}>Trang cá nhân</Link>,
            pageRoutes.userInfo.key,
            <UserOutlined />
        ),
        getItem(
            <Link href={pageRoutes.contact.route}>Liên hệ</Link>,
            pageRoutes.contact.key,
            <ContactsOutlined />
        ),
        getItem(
            <Link href={pageRoutes.checkGuarantee.route}>Kiểm tra bảo hành</Link>,
            pageRoutes.checkGuarantee.key,
            <CustomerServiceOutlined />
        )
    ];

    return (
        <>
            <AiOutlineMenu onClick={showDrawer} className='md:hidden flex items-center text-3xl mr-4' />
            <Drawer placement="left" width={300} closable={false} onClose={onClose} open={open}
                footer={[
                    userAuth != ""
                        ?
                        <Link href="?action=logout" className='flex justify-between'>
                            <Tag className='text-black text-lg' color='geekblue'>{userAuth}</Tag>
                            <Button onClick={onClose}><LogoutOutlined />Đăng Xuất</Button>
                        </Link>
                        :
                        <Link href={pageRoutes.login.route}>
                            <Button onClick={onClose}><LoginOutlined />Đăng Nhập</Button>
                        </Link>
                ]}>
                <p className='text-black font-bold text-2xl ml-5'>L3MSHOP</p>
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[pathName]}
                    style={{ border: 'none' }}
                    items={items}
                    onClick={onClose}
                />
            </Drawer>
        </>
    );
};

export default RespNav;