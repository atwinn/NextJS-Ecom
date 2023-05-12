interface title {
    route: string; title: string; key: string; role?: any;
}
export const pageRoutes: { [key: string]: title } = {
    home: {
        route: "/page-admin",
        title: 'Dashboard',
        key: "1",
        role: [3, 4, 6],
    },
    nhanVien: {
        route: "/page-admin/employee-manage/view",
        title: 'Quản lý nhân viên',
        key: "2",
        role: [6],
    },
    sanPham: {
        route: "/page-admin/product-manage/view",
        title: 'Quản lý sản phẩm',
        key: "3",
        role: [3, 4],
    },
    orderManage: {
        route: "/page-admin/order-manage/view",
        title: 'Quản lý đơn hàng',
        key: "4",
        role: [3, 4],
    },
    trangchu: {
        route: "/",
        title: 'Trang chủ',
        key: "20",
    },
    trangchu2: {
        route: "/home",
        title: 'Trang chủ',
        key: "20",
    },
    pageNotFound: {
        route: "/404",
        title: 'Không tìm thấy',
        key: "35",
    },
    sanPhamUser: {
        route: "/sanpham",
        title: 'Sản phẩm',
        key: "21",
    },
    login: {
        route: "/auth/login",
        title: 'Đăng nhập',
        key: "22",
    },
    register: {
        route: "/auth/register",
        title: 'Đăng ký',
        key: "23",
    },
    account: {
        route: "/page-admin/account-manage/view",
        title: 'Quản lý tài khoản',
        key: "5",
        role: [6],
    },
    forgotPass: {
        route: "/auth/forgot-pass",
        title: 'Lấy lại mật khẩu',
        key: "24",
    },
    phieuNhap: {
        route: "/page-admin/phieu-nhap/view",
        title: 'Phiếu nhập',
        key: "6",
    },
    ncc_nsx: {
        route: "/page-admin/ncc-nsx/view",
        title: 'Đối tác',
        key: "7",
    },
    redirectLogin: {
        route: "/auth/redirect",
        title: 'Chuyển hướng...',
        key: "25",
    },
    confirmPass: {
        route: "/auth/confirm-pass",
        title: 'Đặt lại mật khẩu',
        key: "26",
    },
    cart: {
        route: "/cart",
        title: 'Giỏ hàng',
        key: "27",
    },
    payment: {
        route: "/payment",
        title: 'Thanh toán',
        key: "28",
    },
    userInfo: {
        route: "/userinformation",
        title: 'Thông tin cá nhân',
        key: "29",
    },
    contact: {
        route: "/contact",
        title: 'Liên hệ',
        key: "31"
    },
    checkGuarantee: {
        route: "/checkGuarantee",
        title: 'Kiểm tra bảo hành',
        key: "30",
    },
    contactAdmin: {
        route: "/page-admin/contact-page",
        title: 'Liên hệ - Admin',
        key: "8",
        role: [3],
    },
    categoryAdmin: {
        route: "/page-admin/category-manage/view",
        title: 'Quản lý loại sản phẩm',
        key: "9",
        role: [3, 4],
    },
    Customer: {
        route: "/page-admin/customer-manage",
        title: 'Quản lý khách hàng',
        key: "10",
        role: [3],
    },
};
