import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StarIcon from '@mui/icons-material/Star';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Sidebar from '@/components/common/Sidebar';

import { fetchSellerReviewsAction } from '@/store/actions/seller/seller-review.action';
import { fetchAllProductsAction } from '@/store/actions/seller/seller-product.action';
import {
  fetchSellerPaymentsAction,
  fetchSellerEarningsAction,
} from '@/store/actions/seller/seller-payment.action';
import { fetchSellerOrdersAction } from '@/store/actions/seller/seller-order.action'; 

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reviews = [], loading: reviewLoading } = useSelector((state) => state.sellerReviews || {});
  const { list: products = [], loading: productLoading } = useSelector((state) => state.sellerProduct || {});
  const { payments = [], earnings = {}, loading: paymentLoading } = useSelector((state) => state.sellerPayments || {});
  const { list: orders = [], loading: orderLoading } = useSelector((state) => state.sellerOrders || {});

  useEffect(() => {
    dispatch(fetchSellerReviewsAction());
    dispatch(fetchAllProductsAction());
    dispatch(fetchSellerPaymentsAction());
    dispatch(fetchSellerEarningsAction());
    dispatch(fetchSellerOrdersAction()); 
  }, [dispatch]);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const sellerProductIds = products.map((p) => p.id);

  const filteredReviews = reviews.filter((review) =>
    sellerProductIds.includes(review.product_id)
  );

  const totalReviews = filteredReviews.length;
  const totalRating = filteredReviews.reduce((sum, review) => sum + parseFloat(review.rating || 0), 0);
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';

  const totalProducts = products.length;

  const filteredOrders = orders.filter((order) =>
    order.order_items?.some((item) => sellerProductIds.includes(item.product_id))
  );

  const totalOrders = filteredOrders.length;
  const totalEarnings = earnings?.total_earnings || 0;

  const isLoading = reviewLoading || productLoading || paymentLoading || orderLoading;

  const CardBox = ({ icon, title, value, bg }) => (
    <Card sx={{ p: 2, textAlign: 'center', backgroundColor: bg }}>
      <Box display="flex" justifyContent="center" mb={1}>{icon}</Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h5" fontWeight="bold">{value}</Typography>
    </Card>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />

      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        <Sidebar open={sidebarOpen} />

        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Seller Dashboard
          </Typography>

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                mb: 3,
              }}
            >
              <Box sx={{ flex: '1 1 200px', maxWidth: '250px' }}>
                <CardBox
                  icon={<StoreIcon fontSize="large" color="secondary" />}
                  title="Total Products"
                  value={totalProducts}
                  bg="#f3e5f5"
                />
              </Box>

              <Box sx={{ flex: '1 1 200px', maxWidth: '250px' }}>
                <CardBox
                  icon={<ShoppingCartIcon fontSize="large" color="success" />}
                  title="Total Orders"
                  value={totalOrders}
                  bg="#e8f5e9"
                />
              </Box>

              <Box sx={{ flex: '1 1 200px', maxWidth: '250px' }}>
                <CardBox
                  icon={<CurrencyRupeeIcon fontSize="large" color="success" />}
                  title="Total Earnings"
                  value={`${totalEarnings.toFixed(2)}`}
                  bg="#c8e6c9"
                />
              </Box>

              <Box sx={{ flex: '1 1 200px', maxWidth: '250px' }}>
                <CardBox
                  icon={<RateReviewIcon fontSize="large" color="warning" />}
                  title="Total Reviews"
                  value={totalReviews}
                  bg="#fff8e1"
                />
              </Box>

              <Box sx={{ flex: '1 1 200px', maxWidth: '250px' }}>
                <CardBox
                  icon={<StarIcon fontSize="large" color="primary" />}
                  title="Avg. Rating"
                  value={averageRating}
                  bg="#e1f5fe"
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default SellerDashboard;
