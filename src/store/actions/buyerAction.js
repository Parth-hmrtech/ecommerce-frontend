// src/store/actions/buyerAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

export const fetchBuyerCategories = createAsyncThunk(
  'buyer/fetchBuyerCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/buyer/categories', // ✅ No need for full URL
      });
      return response.data?.data || [];
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Failed to fetch categories';
      return rejectWithValue(message);
    }
  }
);
