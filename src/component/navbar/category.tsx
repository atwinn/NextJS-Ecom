import React, { ReactNode, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Link from 'next/link';
import { pageRoutes } from '@/redux/constant/page-routes.constant';
import { getCookie } from '../../../cookies';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { fetchCategory, selectCategory, selectCategoryStatus } from '@/redux/categorySlice';
import { UserOutlined, CustomerServiceOutlined, PhoneOutlined, AreaChartOutlined } from '@ant-design/icons'

interface CategoryProps {
    children: ReactNode;
}

export const Category = ({ children }: CategoryProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const category = useSelector(selectCategory)
    const status = useSelector(selectCategoryStatus)
    useEffect(() => {
        dispatch(fetchCategory())
    }, [])

    const items: MenuProps['items'] = category.data !== "null" && status === "success"
        ? category.data.map((category: any) => {
            return {
                key: category.id,
                label: (
                    <Link href={`/sanpham?loai=${category.id}`}>
                        {category.attributes.tenLoai}
                    </Link>
                ),
            };
        })
        : []

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
                icon: <AreaChartOutlined />
            },
        ] : [
            {
                key: '1',
                label: (
                    <Link href={pageRoutes.userInfo.route}>
                        Trang cá Nhân
                    </Link>
                ),
                icon: <UserOutlined />
            },
            {
                key: '2',
                label: (
                    <Link href={pageRoutes.contact.route}>
                        Liên hệ
                    </Link>
                ),
                icon: <PhoneOutlined />
            },
            {
                key: '3',
                label: (
                    <Link href={pageRoutes.checkGuarantee.route}>
                        Kiểm tra bảo hành
                    </Link>
                ),
                icon: <CustomerServiceOutlined />
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
