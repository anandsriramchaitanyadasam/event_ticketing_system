import React from "react";
import LayoutTemplate from "./LayoutPages/LayoutTemplate";
// import Dashboard from "../Components/LayoutTemplate";
// LayoutTemplate;

const AdminLayout = ({ children }) => {
  return <LayoutTemplate>{children}</LayoutTemplate>;
};

export default AdminLayout;
