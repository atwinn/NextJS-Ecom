import * as React from 'react';
import { useState } from 'react';
import { Col, Row, Button } from 'antd';
import { ImportOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons'

export default function TitleAndAction() {

    return (
        <>
            <Row gutter={16} style={{ marginTop: '100px', paddingLeft: '100px', paddingRight: '100px' }}>
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
                    >
                        Thêm
                    </Button>
                </Col>
            </Row>
        </>
    );
}