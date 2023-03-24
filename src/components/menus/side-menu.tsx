import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { items, rootSubmenuKeys } from './menu-items';
import Ava from './avatar';

const Menus: React.FC = () => {
    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <>
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{ width: 256, height: '100vh' }}
                items={items}
            >
                <Ava />
            </Menu>
        </>
    );
};

export default Menus;