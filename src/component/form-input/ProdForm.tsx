import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Select, Upload, Image, message } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '@/redux/categorySlice';
import { useSelector } from 'react-redux';
import { selectCategory } from '@/redux/categorySlice';
import { AppDispatch } from '@/redux/store';
import { fetchNcc, fetchNsx, selectNcc, selectNsx } from '@/redux/nccSlice';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { fetchProduct } from '@/redux/productSlice';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import SunEditorCore from "suneditor/src/lib/core";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const { Option } = Select;
const { TextArea } = Input;

const ProdForm = ({ close }: any) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const category = useSelector(selectCategory)
    const ncc = useSelector(selectNcc)
    const nsx = useSelector(selectNsx)
    const [file, setFile] = useState<any>()
    const editor = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    const onFinish = async (values: any) => {
        const formData = new FormData();

        formData.append("data.tenSP", values.tenSP);
        formData.append("data.gia", values.gia);
        formData.append("data.baoHanh", values.baoHanh);
        formData.append("data.ctSanPham", values.ctSP);
        formData.append("data.moTa", values.mota);
        formData.append("data.maLoai", values.loai);
        formData.append("data.maNCC", values.ncc);
        formData.append("data.maNSX", values.nsx);
        formData.append("files.hinh", file);

        const formDataObject = Object.fromEntries(formData);
        console.log(formDataObject);

        // try {
        //     const res = await axios.post("/api/products", formData)
        //     // form.resetFields()
        //     close()
        //     dispatch(fetchProduct())
        //     message.success("Thêm sản phẩm thành công")
        // } catch (error: any) {
        //     if (typeof error.response !== 'undefined') {
        //         if (error.response.status === 400 || error.response.status === 403 || error.response.status === 404 || error.response.status === 500) {
        //             message.error(error.response.data.error.message)
        //         }
        //     }
        // }
    };

    const beforeUpload = (file: any) => {
        setFile(file)
        return false
    }

    useEffect(() => {
        dispatch(fetchCategory())
        dispatch(fetchNcc())
        dispatch(fetchNsx())
    }, [dispatch])

    return (
        <Form
            form={form}
            name="updateUserForm"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 1000 }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Ảnh sản phẩm"
                name="anhSP"
                rules={[{
                    required: true, message: 'Vui lòng chọn ảnh sản phẩm!'
                }]}
            >
                <Upload
                    accept=".jpg,.png"
                    maxCount={1}
                    listType="picture"
                    beforeUpload={beforeUpload}
                >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="Tên sản phẩm"
                name="tenSP"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
                <Input placeholder='Nhập tên sản phẩm' />
            </Form.Item>
            <Form.Item
                label="Giá"
                name="gia"
                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                {
                    pattern: /^\d+$/,
                    message: "Phải là số!",
                }]}
            >
                <Input placeholder='Giá sản phẩm' />
            </Form.Item>
            <div className='flex justify-between space-x-2'>
                <Form.Item
                    label="Loại sản phẩm"
                    name="loai"
                    rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
                    className='w-full'
                >
                    <Select
                        placeholder="Chọn loại sản phẩm"
                    >
                        {category && category.data?.map((item: any) => (
                            <Option value={item.id} key={item.id}>{item.attributes.tenLoai}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Bảo hành"
                    name="baoHanh"
                    rules={[{ required: true, message: 'Vui lòng chọn thời hạn bảo hành' }]}
                    className='w-full'
                >
                    <Select
                        placeholder="Thời hạn bảo hành"
                    >
                        <Option value="6">6 tháng</Option>
                        <Option value="12">12 tháng</Option>
                        <Option value="24">24 tháng</Option>
                    </Select>
                </Form.Item>
            </div>
            <div className='flex justify-between space-x-2'>
                <Form.Item
                    label="Nhà cung cấp"
                    name="ncc"
                    rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
                    className='w-full'
                >
                    <Select
                        placeholder="Chọn nhà cung cấp"
                    >
                        {ncc && ncc.data?.map((item: any) => (
                            <Option value={item.id} key={item.id}>{item.attributes.tenNCC}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Nhà sản xuất"
                    name="nsx"
                    rules={[{ required: true, message: 'Vui lòng chọn nhà sản xuất' }]}
                    className='w-full'
                >
                    <Select
                        placeholder="Chọn nhà sản xuất"
                    >
                        {nsx && nsx.data?.map((item: any) => (
                            <Option value={item.id} key={item.id}>{item.attributes.tenNSX}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>
            <Form.Item
                label="Mô tả"
                name="mota"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
            >
                <SunEditor
                    getSunEditorInstance={getSunEditorInstance}
                    setOptions={{
                        height: "200",
                        buttonList: [
                            ["undo", "redo", "font", "fontSize", "formatBlock"],
                            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                            ["fontColor", "hiliteColor", "outdent", "indent", "align", "horizontalRule", "list", "table"],
                            ["link", "image", "video", "fullScreen", "showBlocks"],
                        ],
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Chi tiết sản phẩm"
                name="ctSP"
                rules={[{ required: true, message: 'Vui lòng nhập chi tiết sản phẩm!' }]}
            >
                <SunEditor
                    getSunEditorInstance={getSunEditorInstance}
                    setOptions={{
                        height: "200",
                        buttonList: [
                            ["undo", "redo", "font", "fontSize", "formatBlock"],
                            ["bold", "underline", "italic"],
                            ["fontColor", "hiliteColor", "align", "list", "table", "fullScreen"],
                        ],
                    }}
                    defaultValue='<p>CPU:<br>RAM:<br>GPU:<br>SSD:<br>PSU:</p>'
                />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit">
                    Thêm mới
                </Button>
            </Form.Item>
        </Form>
    );
}

export default ProdForm;