import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/hooks/useApiRequest';

const fetchBuyerCategoriesAction = createAsyncThunk(
  'buyer/fetchBuyerCategories',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/buyer/categories',
      });

      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

export { fetchBuyerCategoriesAction };
