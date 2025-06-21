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
    resetSellerPasswordAction
} from '../../store/actions/sellerProfileAction';

const SellerProfile = () => {
    const id = JSON.parse(localStorage.getItem('user'))?.id;
    const dispatch = useDispatch();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [formData, setFormData] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordResetMsg, setPasswordResetMsg] = useState('');
    const [passwordResetError, setPasswordResetError] = useState('');
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        setErrorMsg('');
        setSuccessMsg('');
        setUpdating(true);

        dispatch(updateSellerProfileAction({ id, data: formData }))
            .unwrap()
            .then(() => {
                setSuccessMsg('Profile updated successfully');
                setTimeout(() => setSuccessMsg(''), 1000);
            })
            .catch((err) => {
                setErrorMsg(err || 'Update failed');
                setTimeout(() => setErrorMsg(''), 1000);
            })
            .finally(() => {
                setUpdating(false);
            });
    };

    const handlePasswordReset = () => {
        setResetting(true);
        setPasswordResetMsg('');
        setPasswordResetError('');

        dispatch(resetSellerPasswordAction({ oldPassword, newPassword }))
            .unwrap()
            .then(() => {
                setPasswordResetMsg('Password reset successful');
                setOldPassword('');
                setNewPassword('');
                setTimeout(() => setPasswordResetMsg(''), 1000);
            })
            .catch((err) => {
                setPasswordResetError(err || 'Reset failed');
                setTimeout(() => setPasswordResetError(''), 1000);
            })
            .finally(() => {
                setResetting(false);
            });
    };

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />
            <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
                <Sidebar open={sidebarOpen} />
                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h5" gutterBottom>
                        Seller Profile
                    </Typography>

                    {loading || !formData ? (
                        <CircularProgress />
                    ) : (
                        <Paper sx={{ p: 4, maxWidth: '100%', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {/* Profile Update Section */}
                            <Box sx={{ flex: 1, minWidth: 300 }}>
                                <Typography variant="h6" gutterBottom>
                                    Update Profile
                                </Typography>

                                {successMsg && (
                                    <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>
                                )}
                                {errorMsg && (
                                    <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>
                                )}

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

                            {/* Password Reset Section */}
                            <Box sx={{ flex: 1, minWidth: 300 }}>
                                <Typography variant="h6" gutterBottom>
                                    Reset Password
                                </Typography>

                                {passwordResetMsg && (
                                    <Alert severity="success" sx={{ mb: 2 }}>{passwordResetMsg}</Alert>
                                )}
                                {passwordResetError && (
                                    <Alert severity="error" sx={{ mb: 2 }}>{passwordResetError}</Alert>
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
                                                <IconButton
                                                    onClick={() => setShowOldPassword((prev) => !prev)}
                                                    edge="end"
                                                >
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
                                                <IconButton
                                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                                    edge="end"
                                                >
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
