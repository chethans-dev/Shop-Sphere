// AdminLayout.jsx
import React from "react";
import Sidebar from "../components/Admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex items-start justify-center gap-11">
      <div>
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
