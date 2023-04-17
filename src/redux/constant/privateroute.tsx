import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "../../../cookies";
import { Spin } from 'antd';

interface IProps {
    children: React.ReactNode,
}

const PrivateRoute = ({ children }: IProps) => {
    // const { push } = useRouter();
    // const [role, setRole] = useState<number | undefined>(undefined);

    // useEffect(() => {
    //     const fetchRole = async () => {
    //         const roleFromCookie = Number(await getCookie("role"));
    //         setRole(roleFromCookie);
    //     };
    //     fetchRole();
    // }, []);

    // if (role === undefined) {
    //     return <div className="flex justify-center items-center h-screen bg-white">
    //         <Spin size="large" style={{ fontSize: "48px" }} />
    //     </div>;
    // }

    // const allowedRoles = [1, 2, 3];
    // if (!allowedRoles.includes(role)) {
    //     push("/auth/login");
    //     return null;
    // }

    return <>{children}</>;
};

export default PrivateRoute;
