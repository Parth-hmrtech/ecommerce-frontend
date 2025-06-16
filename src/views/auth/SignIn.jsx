import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Link,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../store/actions/authActions';
import { resetAuthState } from '../../store/reducers/authReducer';
import ecommerceLogo from '../../assets/images/ecommerce-logo.png';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const role = userData?.role;

    if (success && user) {
      if (role === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (role === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/');
      }
    }

    return () => {
      dispatch(resetAuthState());
    };
  }, [success, user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(formData));
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
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>

          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}

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
              <Link component="button" variant="body2" onClick={() => navigate('/forgot-password')}>
                Forgot password?
              </Link>
            </Box>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Logging in...' : 'Login'}
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
