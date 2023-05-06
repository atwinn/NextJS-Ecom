import React, { ReactNode, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Link from 'next/link';
import { pageRoutes } from '@/redux/constant/page-routes.constant';
import axios from 'axios';
import { getCookie } from '../../../cookies';

interface CategoryProps {
    children: ReactNode;
}

type Category = {
    key: string;
    attributes: {
        tenLoai: string;
    };
};

export const Category = ({ children }: CategoryProps) => {
    const [categoryData, setCategoryData] = useState<Category[]>([])
    useEffect(() => {
        axios.get("/api/loaisps").then(res => {
            setCategoryData(res.data.data)
        })
    }, [])

    const items: MenuProps['items'] = categoryData.map((category, index) => {
        return {
            key: index + 1,
            label: (
                <Link href={pageRoutes.sanPhamUser.route}>
                    {category.attributes.tenLoai}
                </Link>
            ),
        };
    });

    return (
        <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
                {children}
            </a>
        </Dropdown>
    );
}

export const UserDropDown = ({ children }: CategoryProps) => {
    const [role, setRole] = useState<number | undefined>(undefined);

    useEffect(() => {
        const roleFromCookie = Number(getCookie("role"));
        setRole(roleFromCookie);
    }, []);

    const items: MenuProps['items'] = role === 3 || role === 4 || role === 6 ?
        [
            {
                key: '5',
                label: (
                    <Link href={pageRoutes.home.route}>
                        Đến Trang Quản Trị
                    </Link>
                ),
            },
        ] : [
            {
                key: '1',
                label: (
                    <Link href={pageRoutes.userInfo.route}>
                        Trang cá Nhân
                    </Link>
                ),
            },
            {
                key: '2',
                label: (
                    <Link href={pageRoutes.contact.route}>
                        Liên hệ
                    </Link>
                ),
            },
            {
                key: '3',
                label: (
                    <Link href={pageRoutes.checkGuarantee.route}>
                        Kiểm tra bảo hành
                    </Link>
                ),
            },
        ]


    return (
        <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
                {children}
            </a>
        </Dropdown>
    );
}
