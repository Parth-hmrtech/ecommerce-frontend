// src/store/actions/buyerProductAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

export const fetchBuyerProductById = createAsyncThunk(
  'buyer/fetchBuyerProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/buyer/products/${productId}`, // 👈 only relative path
      });

      return response.data?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'Failed to fetch product';
      return rejectWithValue(message);
    }
  }
);
