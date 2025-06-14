import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Stack
} from '@mui/material';
import ecommerceLogo from '../assets/images/ecommerce-logo.png';
import ProductList from '../components/ProductList';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img
              src={ecommerceLogo}
              alt="Logo"
              style={{ height: 40, marginRight: 8 }}
            />
            <Typography variant="h6" color="inherit" noWrap>
              
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="primary" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/signin')}>
              Sign In
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <ProductList />
      </Container>

      <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} eCommerce. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
