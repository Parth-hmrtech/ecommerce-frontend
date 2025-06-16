// src/components/common/Header.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import logo from '../../assets/images/ecommerce-logo.png';

const Header = ({ sidebarOpen, onToggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/signin';
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1976d2',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 2 }}
          >
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <Box
            component="img"
            src={logo}
            alt="eCommerce Logo"
            sx={{ height: 60, marginRight: 2, mt: 2 }}
          />
          <Typography variant="h6" noWrap>
            eCommerce Dashboard
          </Typography>
        </Box>

        {/* Profile Avatar */}
        <IconButton onClick={handleAvatarClick}>
          <Avatar alt="User" src="/path/to/user-image.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
