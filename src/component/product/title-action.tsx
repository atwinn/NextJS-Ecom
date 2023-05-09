import * as React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import ProdForm from '../form-input/ProdForm';

export default function TitleAndAction() {
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false)

    return (
        <div className='bg-white md:pt-9 border-b-2 rounded-md'>
            <div className='flex justify-between px-3'>
                <p className='text-black text-4xl hidden md:block'>Sản Phẩm</p>
                <Button
                    type='primary'
                    size='large'
                    className='my-3 md:my-0'
                    icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                    onClick={() => setModalOpen(true)}
                >
                    Thêm sản phẩm
                </Button>
                <Modal
                    title="Thêm sản phẩm mới"
                    centered
                    width={850}
                    open={modalOpen}
                    footer={false}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <ProdForm close={handleClose} />
                </Modal>
            </div>
        </div>
    );
}