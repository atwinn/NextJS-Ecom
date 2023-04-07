import React, { useEffect } from 'react'
import axios from 'axios';
import { setCookie } from '../../../cookies';
import { useRouter } from 'next/router';

const Redirect = () => {
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const access_token = searchParams.get("access_token");
                if (access_token) {
                    const res = await axios.get(`/api/auth/google/callback?access_token=${access_token}`);
                    localStorage.setItem("username", res.data.user.username)
                    localStorage.setItem("id", res.data.user.id)
                    setCookie("token", res.data.jwt)
                    router.push("/")
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>Đang chuyển hướng</div>
    )
}

export default Redirect