import { Link } from "react-router-dom";
import adminLogo from '../../assets/default_avatar.png'
const Header = () => {
  return (
    <div className="bg-slate-900 text-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 max-h-14">
        <h3 className="font-bold text-xl">Auth App</h3>
        <nav>
          <ul className="flex gap-4">
            <li className="font-semibold p-1 flex items-center">
              <Link to="/admin/dashboard" className="hover:text-slate-300">
                Dashboard
              </Link>
            </li>
            <li className="font-semibold p-1">
              <Link to="/" className="">
                <button className="bg-slate-500 p-1 rounded hover:bg-slate-300 hover:text-slate-700">SIGN OUT</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
