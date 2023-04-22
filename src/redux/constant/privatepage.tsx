import React, { useEffect, useState } from 'react'
import { getCookie } from '../../../cookies';
import { Spin } from 'antd';
import { useRouter } from "next/router";

interface IProps {
    children: React.ReactNode,
}

const PrivatePage = ({ children }: IProps) => {
    const [role, setRole] = useState<number | undefined>(undefined);
    const { push } = useRouter();

    useEffect(() => {
        const fetchRole = async () => {
            const roleFromCookie = Number(await getCookie("role"));
            setRole(roleFromCookie);
        };
        fetchRole();
    })

    if (role === undefined) {
        return <div className="flex justify-center items-center h-screen bg-white">
            <Spin size="large" style={{ fontSize: "48px" }} />
        </div>;
    }

    const disallowedRoles = [3, 4, 6];
    if (disallowedRoles.includes(role) || !role) {
        push("/");
        return null;
    }

    return <>{children}</>
}

export default PrivatePage