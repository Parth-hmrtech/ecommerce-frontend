// /src/views/auth/SignUp.jsx
import React from 'react';
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

const SignUpForm = ({
  formData,
  confirmPassword,
  showPassword,
  showConfirm,
  loading,
  error,
  handleChange,
  handleSubmit,
  setShowPassword,
  setShowConfirm,
  navigate,
}) => {
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

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
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
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

export default SignUpForm;
