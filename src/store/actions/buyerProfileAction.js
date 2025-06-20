// src/store/actions/buyerProfileAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// Utility: Get token header
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Fetch Buyer Profile
export const fetchBuyerProfile = createAsyncThunk(
  'buyerProfile/fetch',
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

// Update Buyer Profile
export const updateBuyerProfile = createAsyncThunk(
  'buyerProfile/update',
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

// Reset Buyer Password
export const resetBuyerPassword = createAsyncThunk(
  'buyer/resetPassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    console.log(oldPassword);
    console.log(newPassword);
    
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/reset-password',
        data: { oldPassword, newPassword },
        headers: getAuthHeaders(),
      });
      console.log(response);
      
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Password reset failed');
    }
  }
);
