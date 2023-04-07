import React from "react";
import { LayoutManager } from "@/layout/layoutAdmin";
import Dashboard from "@/local-page/admin/dashboard";
// import withAuth from "@/component/author/withAuth";
const PageAdmin = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};
export default PageAdmin;
PageAdmin.PageLayout = LayoutManager;

