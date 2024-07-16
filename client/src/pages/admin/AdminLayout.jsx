
import AdminHeader from "../../components/admin/AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <AdminHeader />
      <Outlet/>
    </div>
  );
}