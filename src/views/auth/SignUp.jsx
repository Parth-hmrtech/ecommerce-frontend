import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stack,
  Link,
  CircularProgress,
  Alert,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '@/hooks/useAuthentication';

const PasswordField = ({ label, name, value, onChange, show, toggleShow, error, helperText }) => (
  <TextField
    label={label}
    name={name}
    type={show ? 'text' : 'password'}
    value={value}
    onChange={onChange}
    fullWidth
    error={!!error}
    helperText={helperText}
    InputProps={{
      endAdornment: (
        <IconButton onClick={toggleShow} edge="end" size="small">
          {show ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      ),
    }}
  />
);

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, loading, error, success, resetAuth } = useAuthentication();

  useEffect(() => {
    if (success) {
      navigate('/signin');
      resetAuth();
    }
  }, [success, navigate, resetAuth]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password_hash: '',
    role: '',
    phone_number: '',
    image_url: '', 
  });

  const [imageFile, setImageFile] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'confirm_password') {
      setConfirmPassword(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({
        ...prev,
        image_url: file.name,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
    if (!formData.password_hash) {
      newErrors.password_hash = 'Password is required';
    } else if (!strongPasswordRegex.test(formData.password_hash)) {
      newErrors.password_hash = 'Password must be 8+ chars, include uppercase, number, special char.';
    }
    if (!confirmPassword) {
      newErrors.confirm_password = 'Confirm password is required';
    } else if (formData.password_hash !== confirmPassword) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.image_url) newErrors.image_url = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
    if (imageFile) payload.append('image', imageFile);

    signUp(payload); 
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#f9f9f9" px={2}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Typography variant="h5" gutterBottom>Sign Up</Typography>

          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}

            <FormControl error={!!errors.image_url}>
              <Button variant="outlined" component="label">
                Upload Profile Image
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>
              {formData.image_url && (
                <Typography variant="body2" mt={1}>Selected: {formData.image_url}</Typography>
              )}
              {errors.image_url && <FormHelperText>{errors.image_url}</FormHelperText>}
            </FormControl>

            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              fullWidth
              error={!!errors.first_name}
              helperText={errors.first_name}
            />

            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              fullWidth
              error={!!errors.last_name}
              helperText={errors.last_name}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
              error={!!errors.phone_number}
              helperText={errors.phone_number}
            />

            <PasswordField
              label="Password"
              name="password_hash"
              value={formData.password_hash}
              onChange={handleChange}
              show={showPassword}
              toggleShow={() => setShowPassword((prev) => !prev)}
              error={errors.password_hash}
              helperText={errors.password_hash}
            />

            <PasswordField
              label="Confirm Password"
              name="confirm_password"
              value={confirmPassword}
              onChange={handleChange}
              show={showConfirm}
              toggleShow={() => setShowConfirm((prev) => !prev)}
              error={errors.confirm_password}
              helperText={errors.confirm_password}
            />

            <FormControl fullWidth error={!!errors.role}>
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
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>

            <Button variant="contained" fullWidth type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{' '}
          <Link component="button" onClick={() => navigate('/signin')}>Sign in</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
