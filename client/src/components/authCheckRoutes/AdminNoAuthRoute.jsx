import { Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"

function AdminNoAuthRoute() {
    const {admin} = useSelector(state => state.admin);
  return admin ? <Navigate to="/admin/dashboard" /> : <Outlet/>
}

export default AdminNoAuthRoute