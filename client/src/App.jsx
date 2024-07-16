import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/user/HomePage";
import SigninPage from "./pages/user/SigninPage";
import SignupPage from "./pages/user/SignupPage";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import Header from "./components/user/Header";
import AdminSigninPage from "./pages/admin/AdminSigninPage.jsx";
import AdminDashbord from "./pages/admin/AdminDashbord.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import UserLayout from "./pages/user/userLayout.jsx";

import PrivateRoute from "./components/user/authCheckRoutes/PrivateRoute.jsx";
import NoAuthRoute from "./components/user/authCheckRoutes/NoAuthRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AdminLayout />}>
          <Route path="/admin/sign-in" element={<AdminSigninPage />} />
          <Route path="/admin/dashboard" element={<AdminDashbord />} />
        </Route>

        <Route element={<UserLayout/>}>
          <Route path="/" element={<HomePage />} />
          <Route element={<NoAuthRoute />}>
            <Route path="/sign-in" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" pauseOnHover={false} />
    </Router>
  );
}

export default App;
