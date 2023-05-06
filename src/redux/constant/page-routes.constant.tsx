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
    sanPhamUser: {
        route: "/sanpham",
        title: 'Sản phẩm',
    },
    login: {
        route: "/auth/login",
        title: 'Đăng nhập',
        key: "4",
    },
    register: {
        route: "/auth/register",
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
    phieuNhap: {
        route: "/page-admin/phieu-nhap/view",
        title: 'Phiếu nhập',
    },
    ncc_nsx: {
        route: "/page-admin/ncc-nsx/view",
        title: 'Đối tác',
    },
    redirectLogin: {
        route: "/auth/redirect",
        title: 'Chuyển hướng...',
    },
    confirmPass: {
        route: "/auth/confirm-pass",
        title: 'Đặt lại mật khẩu',
    },
    cart: {
        route: "/cart",
        title: 'Giỏ hàng',
    },
    payment: {
        route: "/payment",
        title: 'Thanh toán',
    },
    userInfo: {
        route: "/userinformation",
        title: 'Thông tin cá nhân',
    },
    contact: {
        route: "/contact",
        title: 'Liên hệ',
    },
    checkGuarantee: {
        route: "/checkGuarantee",
        title: 'Kiểm tra bảo hành',
    },
    contactAdmin: {
        route: "/page-admin/contact-page",
        title: 'Liên hệ - Admin',
    },
    
};
