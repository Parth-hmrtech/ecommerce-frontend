// src/store/actions/buyerProductAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

export const fetchBuyerProductById = createAsyncThunk(
  'buyer/fetchBuyerProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `http://localhost:3008/api/buyer/products/${productId}`,
      });
      console.log(response);
      
      return response.data?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'Failed to fetch product';
      return rejectWithValue(message);
    }
  }
);
