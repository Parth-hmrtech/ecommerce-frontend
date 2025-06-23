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

import BuyerHeader from '../../components/common/BuyerHeader';
import BuyerFooter from '../../components/common/BuyerFooter';

import {
  fetchBuyerProfileAction,
  updateBuyerProfileAction,
  resetBuyerPasswordAction,
} from '../../store/actions/buyerProfileAction';

const BuyerProfile = () => {
  const id = JSON.parse(localStorage.getItem('user'))?.id;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordResetMsg, setPasswordResetMsg] = useState('');
  const [passwordResetError, setPasswordResetError] = useState('');
  const [passwordResetSeverity, setPasswordResetSeverity] = useState('error');
  const [resetting, setResetting] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { profile, loading } = useSelector((state) => state.buyerProfile);

  useEffect(() => {
    dispatch(fetchBuyerProfileAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (profile?.user) {
      const { first_name, last_name, email, phone_number } = profile.user;
      setFormData({ first_name, last_name, email, phone_number });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setUpdating(true);

    dispatch(updateBuyerProfileAction({ id, data: formData }))
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
    setResetting(true);
    setPasswordResetMsg('');
    setPasswordResetError('');
    setPasswordResetSeverity('error');

    dispatch(resetBuyerPasswordAction({ oldPassword, newPassword }))
      .unwrap()
      .then((res) => {
        const message =
          res?.data?.data?.message || res?.data?.message || 'Password reset successful';

        if (
          message.toLowerCase().includes('incorrect') ||
          message.toLowerCase().includes('not match')
        ) {
          setPasswordResetSeverity('warning');
          setPasswordResetError(message);
          setTimeout(() => setPasswordResetError(''), 4000);
        } else {
          setPasswordResetMsg(message);
          setOldPassword('');
          setNewPassword('');
          setTimeout(() => setPasswordResetMsg(''), 4000);
        }
      })
      .catch((err) => {
        const message = err?.message || err?.error || 'Reset failed';
        setPasswordResetSeverity('error');
        setPasswordResetError(message);
        setTimeout(() => setPasswordResetError(''), 4000);
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
                            />
                            <TextField
                                label="Last Name"
                                name="last_name"
                                fullWidth
                                margin="normal"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                margin="normal"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Phone Number"
                                name="phone_number"
                                fullWidth
                                margin="normal"
                                value={formData.phone_number}
                                onChange={handleChange}
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

                        <Box sx={{ flex: 1, minWidth: 300 }}>
                            <Typography variant="h6" gutterBottom>
                                Reset Password
                            </Typography>

                            {passwordResetMsg && (
                                <Alert severity="success" sx={{ mb: 2 }}>{passwordResetMsg}</Alert>
                            )}

                            {passwordResetError && (
                                <Alert severity={passwordResetSeverity} sx={{ mb: 2 }}>
                                    {passwordResetError}
                                </Alert>
                            )}

                            <TextField
                                label="Old Password"
                                type={showOldPassword ? 'text' : 'password'}
                                fullWidth
                                margin="normal"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
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
                                onChange={(e) => setNewPassword(e.target.value)}
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

            <Box mt="auto">
                <BuyerFooter />
            </Box>
        </Box>
    );
};

export default BuyerProfile;
