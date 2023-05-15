import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const GuaranteeFormStep1= ({current,setCurrent,getResult}:any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true)
    console.log(values);
    await axios.get(`/api/checkBH?idpx=${values.maHD}&idsp=${values.maSP}`).then((res) => {
        // console.log(res);
        setLoading(false)
        setCurrent(current+1)
        getResult(res.data.message)
    }).catch((err) => {
        setCurrent(current+1)
        // console.log(err.response.data.error.message);
        getResult(err.response.data.error.message)
        
    })
  };

  const onReset = () => {
    form.resetFields();
  };


  return (
    <div>
    <h3 className='leading-3 m-6'>Nhập các thông tin kiểm tra</h3>
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600,margin:"auto" }}
    >
      <Form.Item name="maHD" label="Mã hóa đơn" rules={[{ required: true, message:"hãy nhập mã hóa đơn !" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="maSP" label="Mã sản phẩm" rules={[{ required: true, message:"hãy nhập mã sản phẩm !" }]}>
        <Input />
      </Form.Item>
     
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" className='mr-4' loading={loading}>
          Kiểm tra
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
    </div>

  );
};

export default GuaranteeFormStep1;