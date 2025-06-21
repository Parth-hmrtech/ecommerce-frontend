import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchSellerOrdersAction = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/orders',
        headers: getTokenHeader(),
      });
      return response.data.data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to fetch orders';
      return rejectWithValue(errorMsg);
    }
  }
);

const updateOrderStatusAction = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/seller/orders/${orderId}/status`,
        headers: getTokenHeader(),
        data: { status },
      });
      dispatch(fetchSellerOrdersAction());
      return response.data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to update status';
      return rejectWithValue(errorMsg);
    }
  }
);

export { fetchSellerOrdersAction, updateOrderStatusAction };
