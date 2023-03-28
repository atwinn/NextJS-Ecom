import React from "react";
import { LayoutManager } from "@/layout/layoutAdmin";
import Dashboard from "@/local-page/dashboard";
const PageAdmin = () => {
  return (
   <>
    <Dashboard/>
  </>
  );
};
PageAdmin.PageLayout = LayoutManager;
export default PageAdmin;
