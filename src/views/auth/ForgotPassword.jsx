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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../../store/actions/authActions';
import { resetAuthState } from '../../store/reducers/authReducer';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
const { loading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction(email));
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  // Auto-dismiss message after 1 second
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(resetAuthState());
      }, 1000); // 1 second
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

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
              type="email"
              label="Enter your registered email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Typography variant="body2" align="center">
              <Link component="button" onClick={() => navigate('/signin')}>
                Back to Sign In
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
