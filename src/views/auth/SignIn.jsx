import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Link,
  Paper
} from '@mui/material';
import ecommerceLogo from '../../assets/images/ecommerce-logo.png';

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In form data:', formData);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f9f9f9"
      px={2}
    >
      <Box
        component="img"
        src={ecommerceLogo}
        alt="Ecommerce Logo"
        sx={{
          height: 60,
          cursor: 'pointer',
          mb: 4,
        }}
        onClick={() => navigate('/')}
      />

      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>

          <Stack spacing={2}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Box textAlign="right">
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </Link>
            </Box>

            <Button variant="contained" fullWidth type="submit">
              Login
            </Button>

            <Typography variant="body2" align="center">
              Don’t have an account yet?{' '}
              <Link component="button" onClick={() => navigate('/signup')}>
                Sign Up
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn;
