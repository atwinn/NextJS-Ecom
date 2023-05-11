import * as React from 'react';
import { Button, Col, Form, Input, Row, message,DatePicker, DatePickerProps,Select } from "antd";
import axios from 'axios';
import { useDispatch } from 'react-redux';
type SizeType = Parameters<typeof Form>[0]["size"];
const { TextArea } = Input;

export interface IUpdateKHProps {
}

export default function UpdateKH (props: IUpdateKHProps) {
    const [date1, setDate1] = React.useState(
        // moment(employeesId.ngaySinh).format("YYYY-MM-DD")
      );
      const dispatch = useDispatch();
    
      const [componentSize, setComponentSize] = React.useState<SizeType | "default">(
        "default"
      );
      const handleChangedate: DatePickerProps["onChange"] = (
        data: any,
        datastring: any
      ) => {
        setDate1(datastring);
      };
      const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
      };
    const onFinish = (value: any) => {
        console.log(value);
        // axios.put(`/api/khach-hangs/35`, {data: value}).then((res) => {
        //     res.status == 200 ? message.success("thành công") : null
        //     // dispatch(fetchNsx())
        //     // dispatch(closeModal())
        // }).catch((err) => {
        //     message.error(err)
        // })
      };
  return (
    <>
       <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        initialValues={{
        //   ten: employeesId.ten,
        //   sdt: employeesId.sdt,
        //   diaChi: employeesId.diaChi,
        //   gioiTinh: employeesId.gioiTinh ? true : false,
        //   ngaySinh: date1,
        }}
        onFinish={onFinish}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name={"ten"}
          label="Tên"
          rules={[
            { required: true, message: "Vui lòng nhập tên nhân viên!" },
            { min: 3, message: "Tên nhân viên phải có ít nhất 3 ký tự!" },
          ]}
          labelAlign="left"
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"sdt"}
          label="SĐT"
          labelAlign="left"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^\d{10}$/,
              message: "Số điện thoại phải có 10 chữ số!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"ngaySinh"}
          label="Năm sinh"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          labelAlign="left"
          valuePropName={"date"}
          hasFeedback
        >
          <DatePicker
            // defaultValue={dayjs(ngaySinh)}
            onChange={handleChangedate}
          />
        </Form.Item>
        <Form.Item
          name={"gioiTinh"}
          label="Giới tính"
          labelAlign="left"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          hasFeedback
        >
          <Select
            style={{ width: 120 }}
            // onChange={handleChange}
            // defaultValue={employeesId.gioiTinh == "Nam" ? true : false}
            options={[
              {
                value: true,
                label: "Nam",
              },
              {
                value: false,
                label: "Nữ",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name={"diaChi"}
          label="Địa chỉ"
          labelAlign="left"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          hasFeedback
        >
          <TextArea allowClear />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button htmlType="submit">Thay đổi</Button>
        </Form.Item>
      </Form>
    </>
  );
}
