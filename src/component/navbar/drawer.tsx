import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { AiOutlineMenu } from 'react-icons/ai'

const RespNav: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AiOutlineMenu onClick={showDrawer} className='md:hidden flex items-center text-3xl mr-4' />
            <Drawer title="Basic Drawer" placement="left" width={300} closable={false} onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};

export default RespNav;