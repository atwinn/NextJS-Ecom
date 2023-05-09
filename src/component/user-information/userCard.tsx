import React, { useState } from 'react'
import { Card, Typography, Row, Col, Button, Space, Modal, Form } from 'antd';
import UserUpdateForm from './userInfoUpdate';
import moment from 'moment';
import UserPassChange from './userPassChange';

const { Title, Text } = Typography;
interface DataType {
    data: []
}

const UserCard = ({ data, fectchData }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [userData, setUserData] = useState({});
    const [form] = Form.useForm();

    const showModal = (values: any) => {
        setUserData(values)
        setIsModalOpen(true);
    };

    const showModal1 = () => {
        setIsModalOpen1(true);
    };

    const handleCancel2 = () => {
        setIsModalOpen(false);
        form.resetFields();
    }
    const handleCancel1 = () => setIsModalOpen1(false);
    const handleCancel = () => setIsModalOpen(false);

    return (
        <div>
            {data && data.map((item: any) => (
                <Row gutter={[16, 16]} key={item.id}>
                    <Col xs={24} sm={10} lg={9}>
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt=""
                            style={{ maxWidth: '100%' }}
                            className='rounded-full object-fit'
                        />
                    </Col>
                    <Col xs={24} sm={14} lg={15}>
                        <Space direction="vertical" size="middle">
                            <Title level={3}>{item.attributes.ten}</Title>
                            <div className='text-black text-md'>SĐT: {item.attributes.sdt === null ? "Chưa thêm" : item.attributes.sdt}</div>
                            <div className='text-black text-md'>Địa chỉ: {item.attributes.diaChi === null ? "Chưa thêm" : item.attributes.diaChi}</div>
                            <div className='text-black text-md'>Giới tính: {item.attributes.gioiTinh === true ? "Nam" : "Nữ"}</div>
                            <div className='text-black text-md'>Ngày sinh: {item.attributes.ngaySinh === null
                                ? "Chưa thêm"
                                : moment(item.attributes.ngaySinh).format('DD/MM/YYYY')}
                            </div>
                            <div>
                                <Button type="primary" className='mr-2 mb-2' onClick={() => showModal(item)}>Chỉnh sửa thông tin</Button>
                                <Button type="primary" danger onClick={showModal1}>Đổi mật khẩu</Button>
                            </div>
                        </Space>
                    </Col>
                </Row>
            ))}
            <Modal title="Thay đổi thông tin" open={isModalOpen} onCancel={handleCancel2} centered footer={false}>
                <UserUpdateForm userUpdateData={userData} close={handleCancel} fetch={fectchData} form={form} />
            </Modal>
            <Modal title="Đổi mật khẩu" open={isModalOpen1} onCancel={handleCancel1} centered footer={false}>
                <UserPassChange close={handleCancel1} />
            </Modal>
        </div>
    )
}

export default UserCard