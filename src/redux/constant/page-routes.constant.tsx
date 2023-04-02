interface title {
    route: string; title: string; key: string;
}
export const pageRoutes: { [key: string]: title } = {
    home: {
        route: "/page-admin",
        title: 'Dashboard',
        key: "1",
    },
    nhanVien: {
        route: "/page-admin/quan-ly-nhan-vien",
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
};
