import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};
 const placeBuyerOrderAction = createAsyncThunk(
  'buyerOrder/placeBuyerOrder',
  async ({ products, delivery_address }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/buyer/orders',
        data: { products, delivery_address },
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to place order'
      );
    }
  }
  
);const fetchBuyerOrdersAction = createAsyncThunk(
  'buyerOrder/fetchBuyerOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/buyer/orders',
        headers: getTokenHeader(),
      });
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to fetch orders'
      );
    }
  }
);

const fetchBuyerOrderByIdAction = createAsyncThunk(
  'buyerOrder/fetchBuyerOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/buyer/orders/${orderId}`,
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to fetch order'
      );
    }
  }
);

const updateBuyerOrderAddressAction = createAsyncThunk(
  'buyerOrder/updateBuyerOrderAddress',
  async ({ orderId, delivery_address }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/buyer/orders/${orderId}/update-address`,
        data: { delivery_address },
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to update address'
      );
    }
  }
);

const deleteBuyerOrderAction = createAsyncThunk(
  'buyerOrder/deleteBuyerOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/buyer/orders/${orderId}`,
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to delete order'
      );
    }
  }
);

export {
  placeBuyerOrderAction,
  fetchBuyerOrdersAction,
  fetchBuyerOrderByIdAction,
  updateBuyerOrderAddressAction,
  deleteBuyerOrderAction
};
