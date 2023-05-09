import { fetchCategory, selectCategory, selectCategoryStatus, updateCate } from '@/redux/categorySlice'
import { AppDispatch } from '@/redux/store'
import { Button, Modal, Popconfirm, Space, Table, Tooltip } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import UpdateCate from './updateCate'

const CateTable = () => {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const category = useSelector(selectCategory)
    const status = useSelector(selectCategoryStatus)

    useEffect(() => {
        dispatch(fetchCategory())
    }, [])

    const columns = [
        {
            title: 'Tên Loại sản phẩm',
            dataIndex: 'tenLoai',
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_: any, record: any) => {
                const handleOpen = (values: any) => {
                    dispatch(updateCate(values))
                    setOpen(true)
                }
                return (
                    <>
                        <Space wrap>
                            <Tooltip title={"Sửa loại sản phẩm"}>
                                <Button
                                    onClick={() => handleOpen(record)}
                                    className="flex justify-center items-center"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                />
                            </Tooltip>
                        </Space>
                    </>
                );
            },
        },
    ];

    let data = category?.data?.map((item: any) => (
        {
            key: item.id,
            tenLoai: item.attributes.tenLoai,
        }
    ))

    const handleClose = () => setOpen(false)

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: true }}
                loading={status === "loading" ? true : false}
            />
            <Modal footer={false} title="Sửa loại sản phẩm" open={open} onCancel={handleClose}>
                <UpdateCate close={handleClose} />
            </Modal>
        </>
    )
}

export default CateTable