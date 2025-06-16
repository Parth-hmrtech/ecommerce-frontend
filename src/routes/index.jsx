import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import SignIn from "../pages/auth/signIn";
import SignUp from "../pages/auth/signUp";
import ForgotPassword from "../pages/auth/forgotPassword";
import BuyerDashboard from "../pages/buyer/buyerDashboard";
import SellerDashboard from "../pages/seller/sellerDashboard";
import ManageCategory from "../views/seller/Category";
import ProtectedRoute from "../utils/ProtectedRoute";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<ProtectedRoute requiredRole="buyer" />}>
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      </Route>

      <Route element={<ProtectedRoute requiredRole="seller" />}>
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/seller-dashboard/categories" element={<ManageCategory />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
