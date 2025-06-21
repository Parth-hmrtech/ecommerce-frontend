import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// MUI Icons
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StarIcon from '@mui/icons-material/Star';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

import { fetchSellerReviewsAction } from '../../store/actions/sellerReviewAction';
import { fetchAllProductsAction } from '../../store/actions/sellerProductAction';
import {
  fetchSellerPaymentsAction,
  fetchSellerEarningsAction,
} from '../../store/actions/sellerPaymentAction';

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reviews = [], loading: reviewLoading } = useSelector((state) => state.sellerReviews || {});
  const { list: products = [], loading: productLoading } = useSelector((state) => state.sellerProduct || {});
  const { payments = [], earnings = {}, loading: paymentLoading } = useSelector((state) => state.sellerPayments || {});

  useEffect(() => {
    dispatch(fetchSellerReviewsAction());
    dispatch(fetchAllProductsAction());
    dispatch(fetchSellerPaymentsAction());
    dispatch(fetchSellerEarningsAction());
  }, [dispatch]);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Metrics
  const totalReviews = reviews.length;
  const totalProducts = products.length;

  const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating || 0), 0);
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';

  const totalOrders = earnings?.total_orders || 0;
  const totalEarnings = earnings?.total_earnings || 0;

  const isLoading = reviewLoading || productLoading || paymentLoading;

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
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardBox
                  icon={<StoreIcon fontSize="large" color="secondary" />}
                  title="Total Products"
                  value={totalProducts}
                  bg="#f3e5f5"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardBox
                  icon={<ShoppingCartIcon fontSize="large" color="success" />}
                  title="Total Orders"
                  value={totalOrders}
                  bg="#e8f5e9"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardBox
                  icon={<AttachMoneyIcon fontSize="large" color="success" />}
                  title="Total Earnings"
                  value={`₹${totalEarnings.toFixed(2)}`}
                  bg="#c8e6c9"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardBox
                  icon={<RateReviewIcon fontSize="large" color="warning" />}
                  title="Total Reviews"
                  value={totalReviews}
                  bg="#fff8e1"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <CardBox
                  icon={<StarIcon fontSize="large" color="primary" />}
                  title="Avg. Rating"
                  value={averageRating}
                  bg="#e1f5fe"
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default SellerDashboard;
