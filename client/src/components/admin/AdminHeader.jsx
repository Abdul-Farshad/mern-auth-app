import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adminSignOut } from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";
const Header = () => {
  const { admin } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      const response = await axios.get("/api/admin-auth/signout");
      dispatch(adminSignOut());
      toast.success(response.data.message)
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 max-h-14">
        <h3 className="font-bold text-xl">Auth App</h3>
        {admin && (
          <nav>
            <ul className="flex gap-4">
              <li className="font-semibold p-1 flex items-center">
                <Link to="/admin/dashboard" className="hover:text-slate-300">
                  Dashboard
                </Link>
              </li>
              <li className="font-semibold p-1">
                <button
                  className="bg-slate-500 p-1 rounded hover:bg-slate-300 hover:text-slate-700"
                  onClick={handleSignout}
                >
                  SIGN OUT
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
