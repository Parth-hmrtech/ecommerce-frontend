import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../hooks/useApiRequest';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchSellerProfileAction = createAsyncThunk(
  'sellerProfile/fetch',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/profile',
        headers: getAuthHeaders(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
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
        headers: {
          ...getAuthHeaders(),
          ...(data instanceof FormData && { 'Content-Type': 'multipart/form-data' }),
        },
      });

      if (response.status !== 200) {
        throw new Error('Update failed');
      }

      console.log('Profile update successful. Server response:', response.data);
      return response.data?.data || {};
    } catch (error) {
      console.error('Profile update error:', error);
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);

const resetSellerPasswordAction = createAsyncThunk(
  'seller/resetPassword',
  async ({ oldPassword, newPassword }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/reset-password',
        data: { oldPassword, newPassword },
        headers: getAuthHeaders(),
      });
      return fulfillWithValue(response.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

export {
  fetchSellerProfileAction,
  updateSellerProfileAction,
  resetSellerPasswordAction,
};
