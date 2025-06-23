import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Link,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserAction } from '../../store/actions/authActions';
import { resetAuthState } from '../../store/reducers/authReducer';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password_hash: '',
    role: 'buyer',
    phone_number: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);     // password hidden by default
  const [showConfirm, setShowConfirm] = useState(false);       // confirm password hidden by default

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'confirm_password') {
      setConfirmPassword(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password_hash !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const jsonPayload = JSON.stringify(formData);
    dispatch(signUpUserAction(jsonPayload));
  };

  useEffect(() => {
    if (success) {
      navigate('/signin');
      dispatch(resetAuthState());
    }
  }, [success, navigate, dispatch]);

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#f9f9f9" px={2}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>Sign Up</Typography>

          <Stack spacing={2}>
            <TextField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} fullWidth required />
            <TextField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} fullWidth required />
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required />
            <TextField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} fullWidth required />

            {/* Password Field */}
            <TextField
              label="Password"
              name="password_hash"
              type={showPassword ? 'text' : 'password'}
              value={formData.password_hash}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              name="confirm_password"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" fullWidth type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>

            {error && <Typography color="error" align="center">{error}</Typography>}

            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link component="button" onClick={() => navigate('/signin')}>Sign in</Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
