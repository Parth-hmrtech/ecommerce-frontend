// src/store/actions/buyerAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

export const fetchBuyerCategories = createAsyncThunk(
  'buyer/fetchBuyerCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: 'http://localhost:3008/api/buyer/categories',
      });
      log
      return response.data?.data || [];
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Failed to fetch products';
      return rejectWithValue(message);
    }
  }
);
