import { useRouter } from 'next/router';
import { useEffect } from 'react';

const checkAuthenticatedUser = (): boolean => {
    // Lấy roleId từ local storage
    const roleId = typeof window != 'undefined' ? localStorage.getItem('roleId') : null;

    // Nếu roleId không tồn tại hoặc bằng 5, đẩy người dùng về trang đăng nhập
    if (!roleId || parseInt(roleId) === 5) {
        return false;
    }

    // Nếu roleId bằng 1 hoặc 2, cho phép truy cập
    if (parseInt(roleId) === 1 || parseInt(roleId) === 2) {
        return true;
    }

    // Các trường hợp còn lại không được phép truy cập
    return false;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        if (!checkAuthenticatedUser()) {
            // Nếu không xác thực, chuyển hướng người dùng đến trang đăng nhập
            router.push('/auth/login');
        }
    }, [router]);

    return checkAuthenticatedUser() ? <>{children}</> : null;
};

export default PrivateRoute;
