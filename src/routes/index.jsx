// src/routes/index.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/SignUp";
import ForgotPassword from "../views/auth/ForgotPassword";

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
