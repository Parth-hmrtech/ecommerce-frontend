import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Button,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Header = ({ sidebarOpen, onToggleSidebar }) => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/signin';
  };

  const handleProfileClick = () => {
    navigate('/seller-dashboard/profile');
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

          <ShoppingBagIcon sx={{ fontSize: 30, color: '#fff', mr: 1 }} />
          <Typography variant="h6" noWrap color="#fff">
            eCommerce Dashboard
          </Typography>
        </Box>

        <Box
          position="relative"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <IconButton>
            <Avatar alt="User" src="/path/to/user-image.jpg" />
          </IconButton>

          {showOptions && (
            <Paper
              elevation={3}
              sx={{
                position: 'absolute',
                top: '100%',
                right: 0,
                mt: 0,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                minWidth: 150,
              }}
            >
              <Button
                onClick={handleProfileClick}
                startIcon={<AccountCircleIcon />}
                fullWidth
                variant="text"
              >
                My Profile
              </Button>
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                fullWidth
                variant="text"
              >
                Logout
              </Button>
            </Paper>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
