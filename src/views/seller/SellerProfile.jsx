import React, { useEffect, useState, useMemo, useRef } from 'react';
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
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Edit,
  LockReset,
  PhotoCamera,
  Email,
  Phone,
} from '@mui/icons-material';

import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';

import useSellerProfile from '@/hooks/seller/useSellerProfile';

const SellerProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userId = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))?.id || null;
    } catch {
      return null;
    }
  }, []);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image: null,
    image_url: '',
  });

  const [previewData, setPreviewData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image_url: '',
  });

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

  const {
    profile,
    loading,
    updateSellerProfile,
    resetSellerPassword,
    fetchSellerProfile,
  } = useSellerProfile();

  const calledRef = useRef(false);

  useEffect(() => {
    if (!calledRef.current && userId) {
      fetchSellerProfile(userId);
      calledRef.current = true;
    }
  }, [userId, fetchSellerProfile]);

  useEffect(() => {
    if (profile?.user) {
      const { first_name, last_name, email, phone_number, image_url } = profile.user;
      setFormData((prev) => ({
        ...prev,
        first_name,
        last_name,
        email,
        phone_number,
        image_url: prev.image ? prev.image_url : image_url,
      }));
      setPreviewData({
        first_name,
        last_name,
        email,
        phone_number,
        image_url,
      });
    }
  }, [profile]);

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name.trim()) errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formData.phone_number.trim()) errors.phone_number = 'Phone number is required';
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        image_url: URL.createObjectURL(file),
      }));
    }
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    setUpdating(true);
    setSuccessMsg('');
    setErrorMsg('');

    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    data.append('phone_number', formData.phone_number);
    if (formData.image) {
      data.append('image', formData.image);
    }

    updateSellerProfile(data)
      .unwrap()
      .then(() => {
        setSuccessMsg('Profile updated successfully');
        fetchSellerProfile(userId);


      })
      .catch((err) => {
        setErrorMsg(err?.message || 'Update failed');
      })
      .finally(() => {
        setUpdating(false);
        setTimeout(() => {
          setSuccessMsg('');
          setErrorMsg('');
        }, 3000);
      });
  };

  useEffect(() => {
    if (profile?.user) {
      localStorage.setItem('user', JSON.stringify(profile.user));
    }
  }, [profile?.user]);

  const handlePasswordReset = () => {
    if (!validatePassword()) return;

    setResetting(true);
    setPasswordResetMsg('');
    setPasswordResetSeverity('error');

    resetSellerPassword({ oldPassword, newPassword })
      .unwrap()
      .then((res) => {
        const message = res?.data?.message || res?.message || 'Password reset successful';
        const isError = /incorrect|not match|wrong/i.test(message);
        setPasswordResetSeverity(isError ? 'warning' : 'success');
        setPasswordResetMsg(message);
        if (!isError) {
          setOldPassword('');
          setNewPassword('');
        }
      })
      .catch((err) => {
        const message = err?.message || err?.error || 'Reset failed';
        setPasswordResetSeverity('error');
        setPasswordResetMsg(message);
      })
      .finally(() => {
        setResetting(false);
        setTimeout(() => setPasswordResetMsg(''), 3000);
      });
  };

  return (
   <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
  <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
  <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
    <Sidebar open={sidebarOpen} />
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f4f6f8' }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          maxWidth: 1200,
          margin: 'auto',
        }}
      >
        {/* Left Preview */}
        <Box
          component={Paper}
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            minWidth: 300,
            flex: 1,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              src={previewData.image_url || ''}
              alt="Profile"
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="action" /> Seller Info
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          </Stack>
          <Box mt={2}>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Person fontSize="small" color="action" />
              <strong>First Name:</strong> {previewData.first_name || '—'}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Person fontSize="small" color="action" />
              <strong>Last Name:</strong> {previewData.last_name || '—'}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Email fontSize="small" color="action" />
              <strong>Email:</strong> {previewData.email || '—'}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone fontSize="small" color="action" />
              <strong>Phone:</strong> {previewData.phone_number || '—'}
            </Typography>
          </Box>
        </Box>

        {/* Right Edit Section */}
        <Box sx={{ flex: 2, minWidth: 300 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Edit color="primary" /> Edit Profile
          </Typography>
          <Divider sx={{ my: 1 }} />
          {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}

          <TextField label="First Name" name="first_name" fullWidth margin="normal" value={formData.first_name} onChange={handleChange} error={!!formErrors.first_name} helperText={formErrors.first_name} />
          <TextField label="Last Name" name="last_name" fullWidth margin="normal" value={formData.last_name} onChange={handleChange} error={!!formErrors.last_name} helperText={formErrors.last_name} />
          <TextField label="Email" name="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} error={!!formErrors.email} helperText={formErrors.email} />
          <TextField label="Phone Number" name="phone_number" fullWidth margin="normal" value={formData.phone_number} onChange={handleChange} error={!!formErrors.phone_number} helperText={formErrors.phone_number} />

          <Box mt={2} display="flex" alignItems="center" gap={2}>
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Preview"
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
              />
            )}
            <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
              Choose Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpdate} disabled={updating}>
              {updating ? 'Updating...' : 'Update Profile'}
            </Button>
          </Box>

          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 5 }}>
            <LockReset color="error" /> Reset Password
          </Typography>
          <Divider sx={{ my: 1 }} />
          {passwordResetMsg && <Alert severity={passwordResetSeverity} sx={{ mt: 2 }}>{passwordResetMsg}</Alert>}

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
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={handlePasswordReset}
            disabled={resetting}
          >
            {resetting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Box>
      </Paper>
    </Box>
  </Box>
  <Footer />
</Box>

  );
};

export default SellerProfile;
