import * as React from 'react';
import { useState } from 'react';
import { Col, Row, Button, Modal } from 'antd';
import { ImportOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons'
import ProdForm from '../form-input/ProdForm';

export default function TitleAndAction() {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='bg-white mt-5 pt-9 border-b-2 rounded-md'>
            <Row gutter={[16, 8]} className='px-3 lg:px-5'>
                <Col xl={15} lg={0} className='hidden xl:block'>
                    <p className='text-black text-4xl'>Sản Phẩm</p>
                </Col>
                <Col xl={3} sm={8}>
                    <Button
                        size='large'
                        icon={<ImportOutlined style={{ verticalAlign: 'middle' }} />}
                        className='sm:w-full'
                    >
                        Import
                    </Button>
                </Col>
                <Col xl={3} sm={8}>
                    <Button
                        size='large'
                        icon={<ExportOutlined style={{ verticalAlign: 'middle' }} />}
                        className='sm:w-full'
                    >
                        Export
                    </Button>
                </Col>
                <Col xl={3} sm={8}>
                    <Button
                        type='primary'
                        size='large'
                        icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                        className='sm:w-full'
                        onClick={() => setModalOpen(true)}
                    >
                        Thêm
                    </Button>
                    <Modal
                        title="Thêm sản phẩm mới"
                        centered
                        open={modalOpen}
                        onOk={() => setModalOpen(false)}
                        onCancel={() => setModalOpen(false)}
                    >
                        <ProdForm />
                    </Modal>
                </Col>
            </Row>
        </div>
    );
}