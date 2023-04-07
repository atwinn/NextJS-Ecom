import React from 'react';
import { Slider } from 'antd';
import { Typography, Space, Checkbox, Row, Col } from "antd";
import type { SliderMarks } from 'antd/es/slider';

const { Title } = Typography;

const UserProdFilter: React.FC = () => {
    const marks: SliderMarks = {
        0: '0',
        100000000: '100000000'
    };
    return (
        <div className='bg-white p-4 rounded-md border-2'>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Title level={2}>
                    Bộ lọc sản phẩm
                </Title>
                <Slider
                    marks={marks}
                    range={{ draggableTrack: true }}
                    defaultValue={[0, 100000000]}
                    max={100000000}
                    className='mr-7'
                    trackStyle={{ backgroundColor: "#000" }}
                />
                <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                        <Col span={8}>
                            <Checkbox value="A">A</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="B">B</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="C">C</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="D">D</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="E">E</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Space>
        </div>
    )
}

export default UserProdFilter;