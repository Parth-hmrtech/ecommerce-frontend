import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import SignIn from "../pages/auth/signIn";
import SignUp from '../pages/auth/signUp.jsx';
import ForgotPassword from "../pages/auth/forgotPassword";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  </Router>
);

export default AppRoutes;
