import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Paper,
  Avatar,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/images/ecommerce-logo.png';

const BuyerHeader = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const profileImage = user?.image_url;

  const handleLogout = () => {
    localStorage.clear();
    setIsHovering(false);
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={() => navigate('/buyer-dashboard')}
        >
          <img
            src={logo}
            alt="E-commerce Logo"
            style={{ height: 40, width: 'auto', marginRight: 8 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            eCommerce
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/buyer-dashboard')}>
            Products
          </Button>
          <Button color="inherit" onClick={() => navigate('/buyer-dashboard/orders')}>
            My Orders
          </Button>
          <Button color="inherit" onClick={() => navigate('/buyer-dashboard/wishlist')}>
            Wishlist
          </Button>

          <IconButton color="inherit" onClick={() => navigate('/buyer-dashboard/cart')}>
            <ShoppingCartIcon />
          </IconButton>

          <Box
            sx={{ position: 'relative' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <IconButton color="inherit">
              {profileImage ? (
                <Avatar
                  src={profileImage}
                  alt="Profile"
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>
                  <PersonIcon fontSize="small" />
                </Avatar>
              )}
            </IconButton>

            {isHovering && (
              <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  right: 0,
                  mt: 0,
                  zIndex: 10,
                  minWidth: 150,
                  backgroundColor: 'background.paper',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 1 }}>
                  <Button
                    onClick={() => {
                      navigate('/buyer-dashboard/profile');
                      setIsHovering(false);
                    }}
                    sx={{ justifyContent: 'flex-start', px: 2 }}
                    startIcon={<PersonIcon fontSize="small" />}
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    sx={{ justifyContent: 'flex-start', px: 2 }}
                    startIcon={<LogoutIcon fontSize="small" />}
                  >
                    Logout
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BuyerHeader;
