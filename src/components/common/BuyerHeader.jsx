// src/views/buyer/BuyerHeader.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const BuyerHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

 const handleLogout = () => {
  localStorage.clear();
  handleMenuClose();
  navigate('/');
};


  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
          Buyer Dashboard
        </Typography>

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

          {/* Profile Dropdown */}
          <Box sx={{ position: 'relative' }}>
            <IconButton color="inherit" onClick={handleProfileClick}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ elevation: 4, sx: { mt: 1 } }}
            >
              <MenuItem onClick={() => { navigate('/buyer-dashboard/profile'); handleMenuClose(); }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BuyerHeader;
