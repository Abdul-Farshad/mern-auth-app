import UserHeader from "../../components/user/Header";
import { Outlet } from "react-router-dom";
export default function UserLayout() {
  return (
    <div>
      <UserHeader/>
      <Outlet/>
    </div>
  );
}