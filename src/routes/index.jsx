import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/home";
import SignIn from "../pages/auth/signIn";
import SignUp from "../pages/auth/signUp";
import ForgotPassword from "../pages/auth/forgotPassword";

// Buyer Pages
import BuyerDashboard from "../pages/buyer/buyerDashboard";

// Seller Pages
import SellerDashboard from "../pages/seller/sellerDashboard";
import ManageCategory from "../views/seller/Category";
import ManageSubCategory from "../views/seller/SubCategory";
import ManageProducts from "../views/seller/Product";
import SellerOrderList from "../views/seller/Order";
import ManageProductImages from "../views/seller/ProductUploadImage"; // ✅ FIXED

// Utilities
import ProtectedRoute from "../utils/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Buyer Routes */}
        <Route element={<ProtectedRoute requiredRole="buyer" />}>
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        </Route>

        {/* Protected Seller Routes */}
        <Route element={<ProtectedRoute requiredRole="seller" />}>
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-dashboard/categories" element={<ManageCategory />} />
          <Route path="/seller-dashboard/sub-categories" element={<ManageSubCategory />} />
          <Route path="/seller-dashboard/products" element={<ManageProducts />} />
          <Route
            path="/seller-dashboard/products/upload-images"
            element={<ManageProductImages />}
          />
          <Route path="/seller-dashboard/orders" element={<SellerOrderList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
