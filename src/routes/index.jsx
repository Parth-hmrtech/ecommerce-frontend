import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/home";
import SignIn from "../pages/auth/signIn";
import SignUp from "../pages/auth/signUp";
import ForgotPassword from "../pages/auth/forgotPassword";

// Buyer Pages
import BuyerDashboard from "../views/buyer/BuyerDashboard";
import BuyerProductDetail from "../views/buyer/BuyerProductDetail";
import BuyerCart from "../views/buyer/BuyerCart";

// Seller Pages
import SellerDashboard from "../pages/seller/sellerDashboard";
import SellerCategory from "../views/seller/Category";
import SellerSubCategory from "../views/seller/SubCategory";
import SellerProducts from "../views/seller/Product";
import SellerOrderList from "../views/seller/Order";
import SellerProductImages from "../views/seller/ProductUploadImage";
import SellerPayments from "../views/seller/Payment";
import SellerReview from "../views/seller/Review";
import SellerProfile from '../views/seller/Profile';

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
          <Route path="/buyer-dashboard/product-details/:productId" element={<BuyerProductDetail />} />
          <Route path="/buyer-dashboard/cart" element={<BuyerCart />} />

        </Route>

        {/* Protected Seller Routes */}
        <Route element={<ProtectedRoute requiredRole="seller" />}>
          <Route path="/seller-dashboard/" element={<SellerDashboard />} />
          <Route path="/seller-dashboard/categories" element={<SellerCategory />} />
          <Route path="/seller-dashboard/sub-categories" element={<SellerSubCategory />} />
          <Route path="/seller-dashboard/products" element={<SellerProducts />} />
          <Route path="/seller-dashboard/products/upload-images" element={<SellerProductImages />} />
          <Route path="/seller-dashboard/orders" element={<SellerOrderList />} />
          <Route path="/seller-dashboard/payments" element={<SellerPayments />} />
          <Route path="/seller-dashboard/reviews" element={<SellerReview />} />
          <Route path="/seller-dashboard/profile" element={<SellerProfile />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
