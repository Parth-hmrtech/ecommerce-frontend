// /src/views/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  AppBar,
  Grid,
  Button,
  Typography,
} from '@mui/material';
import ecommerceLogo from '../assets/images/ecommerce-logo.png';
import ProductList from '../components/ProductList';

const HomeView = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={1}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            py: 1,
          }}
        >
          <Box display="flex" alignItems="center">
            <img
              src={ecommerceLogo}
              alt="Logo"
              style={{ height: 80, marginRight: 12 }}
            />
          </Box>

          <Box display="flex" gap={2}>
            <Button variant="text" color="primary" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/signin')}>
              Sign In
            </Button>
          </Box>
        </Box>
      </AppBar>

      {/* Product Section */}
      <Container sx={{ py: 4 }}>
        <ProductList />
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} eCommerce. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeView;
