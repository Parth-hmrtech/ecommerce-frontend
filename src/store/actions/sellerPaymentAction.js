import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

export const fetchSellerPaymentsAction = createAsyncThunk(
  'payments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'GET',
        url: 'http://localhost:3008/api/seller/payments',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data; // array of payments
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to fetch payments';
      return rejectWithValue(errorMsg);
    }
  }
);

export const fetchSellerEarningsAction = createAsyncThunk(
  'earnings/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'GET',
        url: 'http://localhost:3008/api/seller/earnings',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data; // assuming earnings are inside `data.data`
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to fetch earnings';
      return rejectWithValue(errorMsg);
    }
  }
);