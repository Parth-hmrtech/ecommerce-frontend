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

import BuyerHeader from '../../components/common/BuyerHeader';
import BuyerFooter from '../../components/common/BuyerFooter';

import useBuyerProfile from '@/hooks/buyer/useBuyerProfile';

const BuyerProfile = () => {
  const id = JSON.parse(localStorage.getItem('user'))?.id;

  const {
    profile,
    loading,
    fetchProfile,
    updateProfile,
    resetPassword,
  } = useBuyerProfile();

  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordResetMessage, setPasswordResetMessage] = useState('');
  const [passwordResetSeverity, setPasswordResetSeverity] = useState('error');
  const [resetting, setResetting] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    fetchProfile(id);
  }, [fetchProfile, id]);

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

    updateProfile({ id, data: formData })
      .unwrap()
      .then(() => {
        setSuccessMsg('Profile updated successfully');
        setTimeout(() => setSuccessMsg(''), 4000);
      })
      .catch((err) => {
        const message = err?.message || err?.error || 'Update failed';
        setErrorMsg(message);
        setTimeout(() => setErrorMsg(''), 4000);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const handlePasswordReset = () => {
    if (!validatePassword()) return;

    setResetting(true);
    setPasswordResetMessage('');
    setPasswordResetSeverity('error');

    resetPassword({ oldPassword, newPassword })
      .unwrap()
      .then((res) => {
        const message =
          res?.data?.data?.message || res?.data?.message || res?.message || '';

        const isError =
          message.toLowerCase().includes('incorrect') ||
          message.toLowerCase().includes('not match') ||
          message.toLowerCase().includes('wrong');

        if (isError) {
          setPasswordResetSeverity('warning');
        } else {
          setPasswordResetSeverity('success');
          setOldPassword('');
          setNewPassword('');
        }

        setPasswordResetMessage(message);
        setTimeout(() => setPasswordResetMessage(''), 3000);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err?.message || 'Reset failed';
        setPasswordResetSeverity('error');
        setPasswordResetMessage(message);
        setTimeout(() => setPasswordResetMessage(''), 3000);
      })
      .finally(() => {
        setResetting(false);
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <BuyerHeader />

      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>

        {loading || !formData ? (
          <CircularProgress />
        ) : (
          <Paper sx={{ p: 4, maxWidth: '100%', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {/* Update Profile */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Typography variant="h6" gutterBottom>
                Update Profile
              </Typography>

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

              {successMsg && <Alert severity="success" sx={{ mt: 1 }}>{successMsg}</Alert>}
              {errorMsg && <Alert severity="error" sx={{ mt: 1 }}>{errorMsg}</Alert>}

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

            {/* Reset Password */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Typography variant="h6" gutterBottom>
                Reset Password
              </Typography>

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

              {passwordResetMessage && (
                <Alert severity={passwordResetSeverity} sx={{ mt: 1 }}>
                  {passwordResetMessage}
                </Alert>
              )}

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

      <Box mt="auto">
        <BuyerFooter />
      </Box>
    </Box>
  );
};

export default BuyerProfile;
