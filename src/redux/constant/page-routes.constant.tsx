interface title {
    route: string; title: string; key?: string;
}
export const pageRoutes: { [key: string]: title } = {
    home: {
        route: "/page-admin",
        title: 'Dashboard',
        key: "1",
    },
    nhanVien: {
        route: "/page-admin/employee-manage/view",
        title: 'Quản lý nhân viên',
        key: "2",
    },
    sanPham: {
        route: "/page-admin/product-manage/view",
        title: 'Quản lý sản phẩm',
        key: "3",
    },
    orderManage: {
        route: "/page-admin/order-manage/view",
        title: 'Quản lý đơn hàng',
        key: "4",
    },
    trangchu: {
        route: "/",
        title: 'Trang chủ',
        key: "3",
    },
    login: {
        route:"/auth/login",
        title: 'Đăng nhập',
        key: "4",
    },
    register: {
        route:"/auth/register",
        title: 'Đăng ký',
        key: "5",
    },
    account: {
        route: "/page-admin/account-manage/view",
        title: 'Quản lý tài khoản',
    },
    forgotPass: {
        route: "/auth/forgot-pass",
        title: 'Lấy lại mật khẩu',
    },
};
