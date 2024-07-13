
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h3 className="font-bold text-xl">Auth App</h3>
        <nav>
          <ul className="flex gap-4">
            <li className='font-medium p-1'>
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
            </li>
            <li className='font-medium p-1'>
              <Link to="/sign-in" className="hover:text-gray-600">
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;