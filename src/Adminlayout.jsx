// Adminlayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "./layout/AdminSidebar";

const Adminlayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64 p-3"> {/* ml-64 for sidebar width */}
        <Outlet /> {/* This renders the nested admin routes */}
      </div>
    </div>
  );
};

export default Adminlayout;