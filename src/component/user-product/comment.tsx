import { Button, Input, List, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { SendOutlined } from '@ant-design/icons'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchComment } from '@/redux/commentSlice';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const Comment = ({ comment, id, userId }: any) => {
    const [newComment, setNewcomment] = useState<any>("")
    const dispatch = useDispatch<AppDispatch>()

    const sendComment = async () => {
        const data = {
            product: id,
            user_id_kh: userId,
            noiDung: newComment,
        }
        try {
            await axios.post("/api/addcomment", data)
            setNewcomment("")
            dispatch(fetchComment(id))
        } catch (error: any) {
            if (typeof error.response !== 'undefined') {
                message.error(error.response.data.error.message)
            }
        }
    }

    return (
        <div className='bg-white rounded-md p-5 mt-3'>
            <List
                itemLayout="horizontal"
                dataSource={comment}
                renderItem={(item: any) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a>{item.khach_hang.ten}</a>}
                            description={item.noiDung}
                        />
                    </List.Item>
                )}
            />
            <div className='flex justify-between gap-2'>
                <Input placeholder='Thêm bình luận' value={newComment} onChange={(e) => setNewcomment(e.target.value)} />
                <Button onClick={sendComment}><SendOutlined className='-rotate-45' /></Button>
            </div>
        </div>
    )
}
export default Comment;