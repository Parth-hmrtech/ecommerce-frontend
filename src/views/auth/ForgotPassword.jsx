import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Stack,
  Alert,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '@/hooks/useAuthentication';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    forgotPassword,
    resetAuth,
    loading,
    error,
    message
  } = useAuthentication();

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!role) {
      setRoleError('Role is required');
      isValid = false;
    } else {
      setRoleError('');
    }

    if (!isValid) return;

    forgotPassword({ email, role });
  };

  useEffect(() => {
    return () => {
      resetAuth();
    };
  }, [resetAuth]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        resetAuth();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message, resetAuth]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f0f2f5"
      px={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="h5" align="center">
              Forgot Password
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}

            <TextField
              select
              label="Select Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              error={!!roleError}
              helperText={roleError}
              disabled={loading}
            >
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </TextField>

            <TextField
              type="email"
              label="Enter your registered email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={!!emailError}
              helperText={emailError}
            />

            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Link component="button" onClick={() => navigate('/signin')}>
            Back to Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
