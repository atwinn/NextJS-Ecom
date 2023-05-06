import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Menu, message } from 'antd';
import { AiOutlineMenu } from 'react-icons/ai'
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons'
import { items } from './menuItems';
import Link from 'next/link';
import { pageRoutes } from '@/redux/constant/page-routes.constant';

const RespNav: React.FC = () => {
    const [open, setOpen] = useState(false);
    const user = typeof window != 'undefined' ? localStorage.getItem("username") : null
    const [userAuth, setUserAuth] = useState("")

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUserAuth(storedUsername || "")
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AiOutlineMenu onClick={showDrawer} className='md:hidden flex items-center text-3xl mr-4' />
            <Drawer placement="left" width={300} closable={false} onClose={onClose} open={open}
                footer={[
                    userAuth != ""
                        ?
                        <Link href="?action=logout">
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
                    style={{ border: 'none' }}
                    items={items}
                    onClick={onClose}
                />
            </Drawer>
        </>
    );
};

export default RespNav;