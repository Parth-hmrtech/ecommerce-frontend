import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const fetchBuyerCategories = createAsyncThunk(
  'buyer/fetchBuyerCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/buyer/categories',
      });
      return response.data?.data || [];
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Failed to fetch categories';
      return rejectWithValue(message);
    }
  }
);

export { fetchBuyerCategories };
