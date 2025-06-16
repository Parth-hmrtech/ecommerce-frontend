import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');

      const response = await apiRequest({
        method: 'GET',
        url: `http://localhost:3008/api/seller/categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err.message || 'Failed to fetch categories'
      );
    }
  }
);
