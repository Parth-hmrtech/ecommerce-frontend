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
  ClickAwayListener,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/images/ecommerce-logo.png';

const BuyerHeader = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const profileImage = user?.image_url;

  const handleLogout = () => {
    localStorage.clear();
    setShowMenu(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/buyer-dashboard/profile');
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo + Title */}
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

        {/* Menu & Avatar */}
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

          <ClickAwayListener onClickAway={closeMenu}>
            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={toggleMenu}
                sx={{ display: 'flex', alignItems: 'center', color: 'white' }}
                startIcon={
                  profileImage ? (
                    <Avatar src={profileImage} alt="Profile" sx={{ width: 32, height: 32 }} />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  )
                }
                endIcon={<ArrowDropDownIcon />}
              >
                {/* optional: user name */}
              </Button>

              {showMenu && (
                <Paper
                  elevation={3}
                  sx={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    right: 0,
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    minWidth: 150,
                    zIndex: 10,
                  }}
                >
                  <Button
                    onClick={handleProfileClick}
                    sx={{ justifyContent: 'flex-start', px: 2 }}
                    startIcon={<PersonIcon fontSize="small" />}
                    fullWidth
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    sx={{ justifyContent: 'flex-start', px: 2 }}
                    startIcon={<LogoutIcon fontSize="small" />}
                    fullWidth
                  >
                    Logout
                  </Button>
                </Paper>
              )}
            </Box>
          </ClickAwayListener>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BuyerHeader;
