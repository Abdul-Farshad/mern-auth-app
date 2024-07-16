import { Link } from "react-router-dom";
import adminLogo from '../../assets/default_avatar.png'
const Header = () => {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 max-h-14">
        <h3 className="font-bold text-xl">Auth App</h3>
        <nav>
          <ul className="flex gap-4">
            <li className="font-semibold p-1 flex items-center">
              <Link to="/admin/dashboard" className="hover:text-gray-600">
                Dashboard
              </Link>
            </li>
            <li className="font-semibold p-1">
              <Link to="/" className="hover:text-gray-600">
                <img className="h-9 w-9 object-cover rounded-full" src={adminLogo} alt="Profile" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
