import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/user/Home";
import SigninPage from "./pages/user/SigninPage";
import SignupPage from "./pages/user/SignupPage";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import Header from "./components/user/Header";
import PrivateRoute from "./components/user/PrivateRoute.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
