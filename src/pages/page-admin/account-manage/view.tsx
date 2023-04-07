import { LayoutManager } from "@/layout/layoutAdmin";
import * as React from "react";
import QLnhanVien from "@/local-page/admin/employee-manage/emp-manager";
import Divider1 from "@/component/devider";
import AccountManager from "@/local-page/admin/acc-manager";
export default function AccountManage() {
  return (
    <>
      <AccountManager/>
    </>
  );
}
AccountManage.PageLayout = LayoutManager;
