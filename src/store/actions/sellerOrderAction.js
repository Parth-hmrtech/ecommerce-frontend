
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

export const fetchSellerOrdersAction = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'GET',
        url: 'http://localhost:3008/api/seller/orders',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data; // data is already an array
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to fetch orders';
      return rejectWithValue(errorMsg);
    }
  }
);
export const updateOrderStatusAction = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('access_token');

      const response = await apiRequest({
        method: 'PUT',
        url: `http://localhost:3008/api/seller/orders/${orderId}/status`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status, // e.g. "shipped"
        },
      });

      // Optionally refetch orders after update
      dispatch(fetchSellerOrdersAction());

      return response.data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to update status';
      return rejectWithValue(errorMsg);
    }
  }
);
