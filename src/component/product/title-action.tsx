import * as React from 'react';
import { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import ProdForm from '../form-input/ProdForm';
import { useRouter } from 'next/router';
import { getCookie } from '../../../cookies';

export default function TitleAndAction() {
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false)
    const { Search } = Input;
    const router = useRouter()
    const params = new URLSearchParams()
    const role = typeof window !== "undefined" ? getCookie("role") : null
    const onSearch = (value: string) => {
        if (params.has("search")) {
            router.replace(`/page-admin/product-manage/view?search=${value}`)
        }
        router.push(`/page-admin/product-manage/view?search=${value}`)
    };
    return (
        <div className='bg-white md:pt-9 border-b-2 rounded-md'>
            <div className='flex justify-between px-3'>
                <p className='text-black text-4xl hidden md:block'>Sản Phẩm</p>
                {role === "4"
                    ? <div className='flex justify-between gap-2'>
                        <Search placeholder="Tìm kiếm sản phẩm" onSearch={onSearch} size='large' allowClear className='my-3 md:my-0' />
                        <Button
                            type='primary'
                            size='large'
                            className='my-3 md:my-0'
                            icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                            onClick={() => setModalOpen(true)}
                        >
                            Thêm sản phẩm
                        </Button>
                    </div>
                    : <Search placeholder="Tìm kiếm sản phẩm" onSearch={onSearch} size='large' allowClear className='my-3 md:my-0' />}
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