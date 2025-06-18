// src/store/actions/sellerProfileAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// ✅ Fetch Seller Profile
export const fetchSellerProfile = createAsyncThunk(
  'sellerProfile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'GET',
        url: 'http://localhost:3008/api/profile',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// ✅ Update Seller Profile using hook instead of raw axios
export const updateSellerProfile = createAsyncThunk(
  'sellerProfile/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'PUT',
        url: `http://localhost:3008/api/profile/${id}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Update failed');
    }
  }
);

export const resetSellerPassword = createAsyncThunk(
  'seller/resetPassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'POST',
        url: 'http://localhost:3008/api/reset-password',
        data: { oldPassword, newPassword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.message;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || 'Password reset failed'
      );
    }
  }
);
