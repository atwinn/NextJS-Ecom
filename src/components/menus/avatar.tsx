import React from 'react';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const Ava: React.FC = () => (
    <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        style={{ backgroundColor: '#87d068' }}
        icon={<UserOutlined />}
    />
);

export default Ava;