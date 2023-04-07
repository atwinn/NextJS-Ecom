import React, { ReactNode } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Link from 'next/link';
import { pageRoutes } from '@/redux/constant/page-routes.constant';

interface CategoryProps {
    children: ReactNode;
}

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link href={pageRoutes.sanPhamUser.route}>
                Laptop
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link href={pageRoutes.sanPhamUser.route}>
                SmartPhone
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link href={pageRoutes.sanPhamUser.route}>
                Portable Computer
            </Link>
        ),
    },
    {
        key: '4',
        label: (
            <Link href={pageRoutes.sanPhamUser.route}>
                Dinh Manh
            </Link>
        ),
    },
];

export const Category = ({ children }: CategoryProps) => (
    <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
            {children}
        </a>
    </Dropdown>
);