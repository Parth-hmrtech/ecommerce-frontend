import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Footer from '../../components/common/Footer';

import {
  fetchSellerProfileAction,
  updateSellerProfileAction,
  resetSellerPasswordAction,
} from '../../store/actions/seller/seller-profile.action';

const SellerProfile = () => {
  const id = JSON.parse(localStorage.getItem('user'))?.id;
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordResetMsg, setPasswordResetMsg] = useState('');
  const [passwordResetSeverity, setPasswordResetSeverity] = useState('error');
  const [resetting, setResetting] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { profile, loading } = useSelector((state) => state.sellerProfile);

  useEffect(() => {
    dispatch(fetchSellerProfileAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (profile?.user) {
      const { first_name, last_name, email, phone_number } = profile.user;
      setFormData({ first_name, last_name, email, phone_number });
    }
  }, [profile]);

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name?.trim()) errors.first_name = 'First name is required';
    if (!formData.last_name?.trim()) errors.last_name = 'Last name is required';
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formData.phone_number?.trim()) errors.phone_number = 'Phone number is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors = {};
    if (!oldPassword.trim()) errors.oldPassword = 'Old password is required';
    if (!newPassword.trim()) {
      errors.newPassword = 'New password is required';
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(newPassword)) {
      errors.newPassword = 'Min 8 chars, 1 uppercase, 1 special char';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    setErrorMsg('');
    setSuccessMsg('');
    setUpdating(true);

    dispatch(updateSellerProfileAction({ id, data: formData }))
      .unwrap()
      .then(() => {
        setSuccessMsg('Profile updated successfully');
        setTimeout(() => setSuccessMsg(''), 3000);
      })
      .catch((err) => {
        const message = err?.message || err?.error || 'Update failed';
        setErrorMsg(message);
        setTimeout(() => setErrorMsg(''), 3000);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const handlePasswordReset = () => {
    if (!validatePassword()) return;

    setResetting(true);
    setPasswordResetMsg('');
    setPasswordResetSeverity('error');

    dispatch(resetSellerPasswordAction({ oldPassword, newPassword }))
      .unwrap()
      .then((res) => {
        const message =
          res?.data?.message ||
          res?.message ||
          'Password reset successful';

        if (
          message.toLowerCase().includes('incorrect') ||
          message.toLowerCase().includes('not match') ||
          message.toLowerCase().includes('wrong')
        ) {
          setPasswordResetSeverity('warning');
          setPasswordResetMsg(message);
        } else {
          setPasswordResetSeverity('success');
          setPasswordResetMsg(message);
          setOldPassword('');
          setNewPassword('');
        }

        setTimeout(() => setPasswordResetMsg(''), 3000);
      })
      .catch((err) => {
        const message = err?.message || err?.error || 'Reset failed';
        setPasswordResetSeverity('error');
        setPasswordResetMsg(message);
        setTimeout(() => setPasswordResetMsg(''), 3000);
      })
      .finally(() => {
        setResetting(false);
      });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        <Sidebar open={sidebarOpen} />
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h5" gutterBottom>
            Seller Profile
          </Typography>

          {loading || !formData ? (
            <CircularProgress />
          ) : (
            <Paper sx={{ p: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {/* --- Profile Section --- */}
              <Box sx={{ flex: 1, minWidth: 300 }}>
                <Typography variant="h6" gutterBottom>
                  Update Profile
                </Typography>

                {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
                {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

                <TextField
                  label="First Name"
                  name="first_name"
                  fullWidth
                  margin="normal"
                  value={formData.first_name}
                  onChange={handleChange}
                  error={!!formErrors.first_name}
                  helperText={formErrors.first_name}
                />
                <TextField
                  label="Last Name"
                  name="last_name"
                  fullWidth
                  margin="normal"
                  value={formData.last_name}
                  onChange={handleChange}
                  error={!!formErrors.last_name}
                  helperText={formErrors.last_name}
                />
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
                <TextField
                  label="Phone Number"
                  name="phone_number"
                  fullWidth
                  margin="normal"
                  value={formData.phone_number}
                  onChange={handleChange}
                  error={!!formErrors.phone_number}
                  helperText={formErrors.phone_number}
                />

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleUpdate}
                  disabled={updating}
                >
                  {updating ? 'Updating...' : 'Update Profile'}
                </Button>
              </Box>

              {/* --- Password Section --- */}
              <Box sx={{ flex: 1, minWidth: 300 }}>
                <Typography variant="h6" gutterBottom>
                  Reset Password
                </Typography>

                {passwordResetMsg && (
                  <Alert severity={passwordResetSeverity} sx={{ mb: 2 }}>
                    {passwordResetMsg}
                  </Alert>
                )}

                <TextField
                  label="Old Password"
                  type={showOldPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    setPasswordErrors((prev) => ({ ...prev, oldPassword: '' }));
                  }}
                  error={!!passwordErrors.oldPassword}
                  helperText={passwordErrors.oldPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowOldPassword((prev) => !prev)}>
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordErrors((prev) => ({ ...prev, newPassword: '' }));
                  }}
                  error={!!passwordErrors.newPassword}
                  helperText={passwordErrors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword((prev) => !prev)}>
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={handlePasswordReset}
                  disabled={resetting}
                >
                  {resetting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SellerProfile;
