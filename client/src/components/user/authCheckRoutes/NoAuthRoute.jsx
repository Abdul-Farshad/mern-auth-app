import { Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"

function NoAuthRoute() {
    const {currentUser} = useSelector(state => state.user);
  return currentUser ? <Navigate to="/" /> : <Outlet/>
}

export default NoAuthRoute
