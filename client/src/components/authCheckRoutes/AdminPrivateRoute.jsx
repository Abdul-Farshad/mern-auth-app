import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
function AdminPrivateRoute() {

    const {admin} = useSelector(state => state.admin)
  return (
      admin ? <Outlet/> : <Navigate to="/admin/sign-in"/>
  )
}

export default AdminPrivateRoute
