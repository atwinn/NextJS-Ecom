import React, { useState } from 'react'
import { Card, Typography, Row, Col, Button, Space, Modal } from 'antd';
import UserUpdateForm from './userInfoUpdate';

const { Title, Text } = Typography;
interface DataType {
    data: []
}

const UserCard = ({ data }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({});

    const showModal = (values: any) => {
        setUserData(values)
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
            {data && data.map((item: any) => (
                <Row gutter={[16, 16]} key={item.id}>
                    <Col xs={24} sm={10} lg={9}>
                        <img
                            src={"https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"}
                            alt=""
                            style={{ maxWidth: '100%' }}
                            className='rounded-md object-fit'
                        />
                    </Col>
                    <Col xs={24} sm={14} lg={15}>
                        <Space direction="vertical" size="middle">
                            <Title level={3}>{item.attributes.ten}</Title>
                            <div className='text-black text-md'>SĐT: {item.attributes.sdt === null ? "Chưa thêm" : item.attributes.sdt}</div>
                            <div className='text-black text-md'>Địa chỉ: {item.attributes.diaChi === null ? "Chưa thêm" : item.attributes.diaChi}</div>
                            <div className='text-black text-md'>Giới tính: {item.attributes.gioiTinh === true ? "Nam" : "Nữ"}</div>
                            <div className='text-black text-md'>Ngày sinh: {item.attributes.ngaySinh === null ? "Chưa thêm" : item.attributes.ngaySinh}</div>
                            <div>
                                <Button type="primary" className='mr-2 mb-2' onClick={() => showModal(item)}>Chỉnh sửa thông tin</Button>
                                <Button type="primary" danger onClick={showModal}>Đổi mật khẩu</Button>
                            </div>
                        </Space>
                    </Col>
                </Row>
            ))}
            <Modal title="Thay đổi thông tin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered footer={false}>
                <UserUpdateForm userUpdateData={userData} />
            </Modal>
        </div>
    )
}

export default UserCard