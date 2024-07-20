import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 max-h-14">
        <h3 className="font-bold text-xl">Auth App</h3>
        <nav>
          <ul className="flex gap-4">
            <li className="font-semibold p-1 flex items-center">
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
            </li>
            <li className="font-semibold p-1">
              <Link to="/profile" className="hover:text-gray-600">
                {currentUser ? <img className="h-9 w-9 object-cover rounded-full" src={currentUser.profilePicture} alt="Profile" /> : "Sign In"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
