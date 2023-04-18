import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import Image from 'next/image';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { fetchProduct, selectProduct, updateProd } from '@/redux/productSlice';
import { fetchNcc, fetchNsx, selectNcc, selectNsx } from '@/redux/nccSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchCategory, selectCategory } from '@/redux/categorySlice';
import { useSelector } from 'react-redux'; import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import SunEditorCore from "suneditor/src/lib/core";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const { Option } = Select;
const { TextArea } = Input;

const UpdateProdForm = ({ close }: any) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const [imageFile, setImageFile] = useState<File | null>(null);
    const editor = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    const onFinish = async (values: any) => {
        console.log(values);
    }
    const category = useSelector(selectCategory)
    const ncc = useSelector(selectNcc)
    const nsx = useSelector(selectNsx)
    const { productId } = useSelector((store: any) => store.product)
    const image = productId.hinh


    useEffect(() => {
        dispatch(fetchCategory())
        dispatch(fetchNcc())
        dispatch(fetchNsx())
    }, [dispatch])

    useEffect(() => {
        if (productId) {
            form.setFieldsValue({
                tenSP: productId.ten,
                gia: productId.gia,
                baoHanh: productId.baoHanh,
                loai: productId.loai.id,
                ncc: productId.ncc.id,
                nsx: productId.nsx.id,
                mota: productId.moTa,
                ctSP: productId.ctSanPham
            });
        }
    }, [productId, form])

    return (
        <div>
            <Form
                form={form}
                name="updateProdForm"
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
                    {!imageFile
                        ? <div className='mb-2'>
                            <img src={image} alt="" width={100} height={100} className='rounded-lg' />
                        </div>
                        : null
                    }
                    <Upload
                        accept=".jpg,.png"
                        maxCount={1}
                        listType="picture"
                        beforeUpload={(file) => {
                            setImageFile(file)
                            return false;
                        }}
                        onRemove={() => setImageFile(null)}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh khác</Button>
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
                        setContents={productId.moTa}
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
                        setContents={productId.ctSanPham}
                        setOptions={{
                            height: "200",
                            buttonList: [
                                ["undo", "redo", "font", "fontSize", "formatBlock"],
                                ["bold", "underline", "italic"],
                                ["fontColor", "hiliteColor", "align", "list", "table", "fullScreen"],
                            ],
                        }}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm mới
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateProdForm