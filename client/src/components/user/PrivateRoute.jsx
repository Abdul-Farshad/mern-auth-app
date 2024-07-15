import { useSelector } from "react-redux" 
import { Outlet, Navigate } from "react-router-dom"

function PrivateRoute() {
  const { currentUser } = useSelector(state => state.user)
  // Outlet using for children of the component
  return currentUser ? <Outlet/> : <Navigate to="/sign-in" />
  
}

export default PrivateRoute
