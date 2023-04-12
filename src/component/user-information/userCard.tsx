import React, { useState } from 'react'
import { Card, Typography, Row, Col, Button, Space, Modal } from 'antd';
import UserUpdateForm from './userInfoUpdate';

const { Title, Text } = Typography;

const UserCard = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Row gutter={[16, 16]} className='flex items-center'>
                <Col xs={0} sm={3} lg={6}></Col>
                <Col xs={24} sm={9} lg={6}>
                    <img
                        src={"https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"}
                        alt=""
                        style={{ maxWidth: '100%' }}
                        className='rounded-md object-contain'
                    />
                </Col>
                <Col xs={24} sm={9} lg={6}>
                    <Space direction="vertical" size="middle">
                        <Title level={3}>Đinh Đức Long</Title>
                        <div className='text-black text-xl'>SĐT: 0342424787</div>
                        <div className='text-black text-xl'>Địa chỉ: Tô ký, Hóc Xương</div>
                        <div>
                            <Button type="primary" size='large' className='mr-2 mb-2' onClick={showModal}>Chỉnh sửa thông tin</Button>
                            <Button type="primary" size='large' danger onClick={showModal}>Đổi mật khẩu</Button>
                        </div>
                    </Space>
                </Col>
                <Col xs={0} sm={3} lg={6}></Col>
            </Row>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered footer={false}>
                <UserUpdateForm />
            </Modal>
        </div>
    )
}

export default UserCard