import React, { useEffect } from 'react'
import axios from 'axios';
import { setCookie } from '../../../cookies';
import { useRouter } from 'next/router';
import { Spin, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const Redirect = () => {
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const access_token = searchParams.get("access_token");
                const id_token = searchParams.get("id_token")
                if (access_token) {
                    if (id_token) {
                        const res = await axios.get(`/api/auth/google/callback?access_token=${access_token}`)
                        localStorage.setItem("username", res.data.user.username)
                        localStorage.setItem("id", res.data.user.id)
                        setCookie("token", res.data.jwt)
                        const userId = res.data.user.id
                        const res2 = await axios.get(`/api/users/${userId}?populate=*`)
                        setCookie("role", res2.data.role.id)
                        router.push("/")
                    } else {
                        const res = await axios.get(`/api/auth/facebook/callback?access_token=${access_token}`)
                        localStorage.setItem("username", res.data.user.username)
                        localStorage.setItem("id", res.data.user.id)
                        setCookie("token", res.data.jwt)
                        const userId = res.data.user.id
                        const res2 = await axios.get(`/api/users/${userId}?populate=*`)
                        setCookie("role", res2.data.role.id)
                        router.push("/")
                    }
                } else {
                    message.error("Đăng nhập thất bại")
                    router.push("/auth/login")
                }
            } catch (error: any) {
                if (typeof error.response !== 'undefined') {
                    message.error(error.response.data.error.message)
                    message.error("Đăng nhập thất bại")
                    router.push("/auth/login")
                }
            }
        };

        fetchData();
    }, []);
    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} />;
    return (
        <div style={{ width: '100vw', height: '100vh' }} className='bg-white flex justify-center items-center flex-col gap-12'>
            <Spin indicator={antIcon} />
            <p className='custom-text font-semibold text-lg'>Đang chuyển hướng chờ chút nhé</p>
        </div>
    )
}

export default Redirect