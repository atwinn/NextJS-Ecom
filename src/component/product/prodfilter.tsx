import * as React from 'react';
import { useState } from 'react';
import { Input, Col, Row, Space, Select, Button } from 'antd';
import type { SelectProps } from 'antd';

export default function ProdFilter() {

    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    return (
        <div className='bg-white mt-5 py-5 border-b-2 rounded-md'>
            <Row gutter={[16, 8]} className='px-3 lg:px-5'>
                <Col xl={6} md={12} xs={24}>
                    <Input.Search
                        placeholder="Tìm kiếm"
                        size="large"
                        allowClear
                    />
                </Col>
                <Col xl={4} md={6} xs={12}>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        size='large'
                        placeholder="Chọn loại"
                        defaultValue={['a10', 'c12']}
                        options={options}
                    />
                </Col>
                <Col xl={4} md={6} xs={12}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        size='large'
                        placeholder="Nhà cung cấp"
                        options={options}
                    />
                </Col>
                <Col xl={4} md={6} xs={12}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        size='large'
                        placeholder="Tình trạng"
                        options={options}
                    />
                </Col>
                <Col xl={4} md={6} xs={12}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        size='large'
                        placeholder="Số lượng"
                        options={options}
                    />
                </Col>
                <Col xl={2} md={4} xs={8}>
                    <Button
                        type="primary"
                        style={{ width: '100%', overflow: 'hidden' }}
                        size='large'
                        loading={loadings[0]}
                        onClick={() => enterLoading(0)}
                    >
                        Lọc
                    </Button>
                </Col>
            </Row>
        </div>
    );
}