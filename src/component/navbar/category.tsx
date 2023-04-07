import React, { ReactNode, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Link from 'next/link';
import { pageRoutes } from '@/redux/constant/page-routes.constant';
import axios from 'axios';

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
            console.log(res);
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
