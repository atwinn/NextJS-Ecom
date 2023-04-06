import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const redirect = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const access_token = searchParams.get("access_token");
                if (access_token) {
                    const res = await axios.get(`/api/auth/google/callback?access_token=${access_token}`);
                    console.log(res);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>redirect</div>
    )
}

export default redirect