import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchSellerOrdersAction = createAsyncThunk(
  'orders/fetchAll',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/orders',
        headers: getTokenHeader(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const updateOrderStatusAction = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/seller/orders/${orderId}/status`,
        headers: getTokenHeader(),
        data: { status },
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

export {
  fetchSellerOrdersAction,
  updateOrderStatusAction,
};
