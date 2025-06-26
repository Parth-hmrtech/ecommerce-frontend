import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  ListItemIcon,
  Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const BuyerHeader = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsHovering(false);
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
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

          <Box
            sx={{ position: 'relative' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>

            {isHovering && (
              <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  right: 0,
                  mt: 0,
                  zIndex: 0,
                  minWidth: 150,
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    py: 1,
                  }}
                >
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
