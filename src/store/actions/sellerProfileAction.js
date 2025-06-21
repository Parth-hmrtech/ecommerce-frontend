import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchSellerProfileAction = createAsyncThunk(
  'sellerProfile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/profile',
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

const updateSellerProfileAction = createAsyncThunk(
  'sellerProfile/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/profile/${id}`,
        data,
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Update failed');
    }
  }
);

const resetSellerPasswordAction = createAsyncThunk(
  'seller/resetPassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/reset-password',
        data: { oldPassword, newPassword },
        headers: getAuthHeaders(),
      });
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Password reset failed');
    }
  }
);

export {
  fetchSellerProfileAction,
  updateSellerProfileAction,
  resetSellerPasswordAction,
};
