import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined,CloseSquareOutlined } from '@ant-design/icons';
import { BsReplyAll } from 'react-icons/bs'
import { Card, Col, Row, Statistic } from 'antd';
import formatMoney from '../formatMoney';

const App = (props:any) => (
  <Row gutter={16} style={{marginBottom:"3rem"}}>
    <Col md={6}>
      <Card bordered={false} loading={props.loading}>
        <Statistic
          title="Doanh thu"
          value={formatMoney(props.doanhThu)}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          // suffix="%"
        />
      </Card>
    </Col>
    <Col md={6} >
      <Card bordered={false} loading={props.loading}>
        <Statistic
          title="Chi tiêu"
          value={formatMoney(props.chitieu)}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          // suffix="$"
        />
      </Card>
    </Col>
    <Col md={6} >
      <Card bordered={false} loading={props.loading}>
        <Statistic
          title="Đơn hủy"
          value={props.donHuy}
          // precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<CloseSquareOutlined /> }
          // suffix=""
        />
      </Card>
    </Col>
    <Col md={6} >
      <Card bordered={false} loading={props.loading}>
        <Statistic
          title="Tin nhắn chưa phản hồi"
          value={props.mess}
          // precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<BsReplyAll />}
        />
      </Card>
    </Col>
  </Row>
);

export default App;