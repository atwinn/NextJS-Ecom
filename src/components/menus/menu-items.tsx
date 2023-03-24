import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export const items: MenuItem[] = [
    getItem('Liên hệ', '1', <MailOutlined />),
    getItem('Sản phẩm', '2', <AppstoreOutlined />),
    getItem('Cài đặt', 'sub1', <SettingOutlined />, [
        getItem('Tài khoản', '3'),
        getItem('Hệ thống', '4'),
    ]),
];