import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Link,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Alert,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import useAuthentication from '@/hooks/useAuthentication';
import ecommerceLogo from '@/assets/images/ecommerce-logo.png';

const SignIn = () => {
  const navigate = useNavigate();
  const {
    user,
    loading,
    error,
    signIn,
  } = useAuthentication();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      if (user.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (user.role === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showFieldError = (field, message) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
    setTimeout(() => {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.email.trim()) {
      showFieldError('email', 'Email is required');
      hasError = true;
    }

    if (!formData.password.trim()) {
      showFieldError('password', 'Password is required');
      hasError = true;
    }

    if (!formData.role) {
      showFieldError('role', 'Please select role');
      hasError = true;
    }

    if (hasError) return;

    signIn(formData);
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
        sx={{ height: 60, cursor: 'pointer', mb: 4 }}
        onClick={() => navigate('/')}
      />

      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h5" gutterBottom>
              Sign In
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth error={!!fieldErrors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
              {fieldErrors.role && (
                <FormHelperText>{fieldErrors.role}</FormHelperText>
              )}
            </FormControl>

            <Box textAlign="right">
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Don’t have an account yet?{' '}
          <Link component="button" onClick={() => navigate('/signup')}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignIn;
