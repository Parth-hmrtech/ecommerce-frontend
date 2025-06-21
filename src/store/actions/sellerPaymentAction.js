import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchSellerPaymentsAction = createAsyncThunk(
  'payments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/payments',
        headers: getTokenHeader(),
      });
      return response.data.data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to fetch payments';
      return rejectWithValue(errorMsg);
    }
  }
);

const fetchSellerEarningsAction = createAsyncThunk(
  'earnings/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/earnings',
        headers: getTokenHeader(),
      });
      return response.data.data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to fetch earnings';
      return rejectWithValue(errorMsg);
    }
  }
);

export { fetchSellerPaymentsAction, fetchSellerEarningsAction };
