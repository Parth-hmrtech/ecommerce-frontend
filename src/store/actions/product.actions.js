import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const fetchProductsAction = createAsyncThunk(
  'products/fetchProducts',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/buyer/products',
      });

      if (response?.status !== 200) {
        return rejectWithValue(new Error("Something is wrong here"));
      }

      return fulfillWithValue(response?.data?.data || []);
    } catch (error) {
      return rejectWithValue(
        new Error(error?.data?.message || "Something is wrong here")
      );
    }
  }
);

export { fetchProductsAction };
