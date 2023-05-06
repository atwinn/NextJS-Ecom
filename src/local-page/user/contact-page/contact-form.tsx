import React from 'react'
import { Row, Col, Button, Form, Input } from 'antd'
const { TextArea } = Input
import { UserOutlined, MailOutlined } from '@ant-design/icons'
import axios from 'axios'
import { message } from "antd";

// function encode(data:any) {
//     return Object.keys(data)
//         .map(key => encodeURIComponent(key) + `=` + encodeURIComponent(data[key]))
//         .join(`&`)
// }

const ContactPage = () => {
    const formName = `contact`
    const handleSubmit = async (values:any) => {
     console.log(values);
        if (values[`bot-field`] === undefined) {
            delete values[`bot-field`]
        }
    await axios.post("/api/lien-hes",{data:values}).then((res) => {
        console.log(res);
        message.success("Gửi tin nhắn thành công")
    }).catch((err) => {
        console.log(err);
    })
    }
    return (
       

        <Row
            justify="space-around"
        >
            <Col
                xs={22}
                sm={18}
                md={16}
                lg={12}
            >
                {/*
                    This defines how your form is setup for the Netlify bots.
                    Users will not see or interact with this form.
                */}
                <form
                    name={formName}
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    hidden
                >
                    <input type="text" name="name" />
                    <input type="email" name="email" />
                    <textarea name="message"></textarea>
                </form>

                <Form
                    name="cf"
                    method="post"
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    {/* This is the hidden field that the netlify-honeypot uses. */}
                    <Form.Item
                        label="Don't fill this out"
                        className={`hidden`}
                        style={{ display: `none` }}
                        name="bot-field"
                    >
                        <Input type={`hidden`} />
                    </Form.Item>

                    <Form.Item
                        label="Họ tên"
                        rules={[{ required: true, message: `Hãy nhập tên của bạn.` }]}
                        name="name"
                    >
                        <Input
                            placeholder="Họ tên"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        rules={[{ required: true, type: `email`, message: `Hãy nhập email.` }]}
                        name="email"
                    >
                        <Input
                            placeholder="Email của bạn"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Lời nhắn"
                        rules={[{ required: true, message: `Hãy ghi lời nhắn của bạn.` }]}
                        name="message"
                    >
                        <TextArea
                            placeholder="Tin nhắn của bạn"
                            rows={5}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={false}>
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
export default ContactPage
