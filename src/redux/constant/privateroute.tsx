import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "../../../cookies";
import { Spin } from 'antd';
import { pageRoutes } from "./page-routes.constant";

interface IProps {
    children: React.ReactNode,
}

const PrivateRoute = ({ children }: IProps) => {
    const { push } = useRouter();
    const [role, setRole] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchRole = async () => {
            const roleFromCookie = Number(await getCookie("role"));
            setRole(roleFromCookie);
        };
        fetchRole();
    }, []);

    if (role === undefined) {
        return <div className="flex justify-center items-center h-screen bg-white">
            <Spin size="large" style={{ fontSize: "48px" }} />
        </div>;
    }

    const allowedRoutes = Object.values(pageRoutes).filter((route: any) => {
        return !route.role || route.role.includes(role);
    }).map((route: any) => route.route);

    if (!allowedRoutes.includes(window.location.pathname)) {
        push("/404");
        return null;
    }

    return <>{children}</>;
};

export default PrivateRoute;
