// src/pages/seller/SellerDashboard.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* Fixed Header */}
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />

      {/* Sidebar + Main */}
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        <Sidebar open={sidebarOpen} />

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Seller Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={() => navigate('/seller/products')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Products
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage your product listings
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={() => navigate('/seller/earnings')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Earnings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View total income and sales reports
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={() => navigate('/seller/orders')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Orders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      See and manage incoming orders
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={() => navigate('/seller/reviews')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Reviews
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View customer ratings and feedback
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default SellerDashboard;
