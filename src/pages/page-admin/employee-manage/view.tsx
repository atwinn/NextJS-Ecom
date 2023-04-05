import { LayoutManager } from "@/layout/layoutAdmin";
import * as React from "react";
import QLnhanVien from "@/local-page/admin/emp-manager";
export default function QlnhanVienPage() {
  return (
    <>
      <QLnhanVien />
    </>
  );
}
QlnhanVienPage.PageLayout = LayoutManager;
