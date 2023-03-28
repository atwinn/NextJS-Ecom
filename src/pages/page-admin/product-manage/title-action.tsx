import * as React from 'react';
import { useState } from 'react';
import { Col, Row, Button, Modal } from 'antd';
import { ImportOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons'
import ProdForm from './form';

export default function TitleAndAction() {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='bg-white mt-5 py-5 border-b-2 rounded-md'>
            <Row gutter={16} style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                <Col md={18} xs={0} >
                    <p className='text-black text-4xl'>Sản Phẩm</p>
                </Col>
                <Col md={2} xs={4}>
                    <Button
                        size='large'
                        icon={<ImportOutlined style={{ verticalAlign: 'middle' }} />}
                    >
                        Import
                    </Button>
                </Col>
                <Col md={2} xs={4}>
                    <Button
                        size='large'
                        icon={<ExportOutlined style={{ verticalAlign: 'middle' }} />}
                    >
                        Export
                    </Button>
                </Col>
                <Col md={2} xs={4}>
                    <Button
                        type='primary'
                        size='large'
                        icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                        style={{ backgroundColor: '#1890ff' }}
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