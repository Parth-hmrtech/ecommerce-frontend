import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const BASE_ENDPOINT = '/buyer/cart';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchBuyerCart = createAsyncThunk(
  'buyerCart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: BASE_ENDPOINT,
        headers: getAuthHeaders(),
      });
      return response.data?.data || [];
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

const addToBuyerCart = createAsyncThunk(
  'buyerCart/add',
  async ({ product_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: BASE_ENDPOINT,
        headers: getAuthHeaders(),
        data: { product_id, quantity },
      });
      return response.data?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

const updateBuyerCart = createAsyncThunk(
  'buyerCart/update',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `${BASE_ENDPOINT}/${id}`,
        headers: getAuthHeaders(),
        data: { quantity: String(quantity) },
      });
      return response.data?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to update cart');
    }
  }
);

const deleteBuyerCart = createAsyncThunk(
  'buyerCart/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `${BASE_ENDPOINT}/${id}`,
        headers: getAuthHeaders(),
      });
      return response.data?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete item');
    }
  }
);

export { fetchBuyerCart, addToBuyerCart, updateBuyerCart, deleteBuyerCart };
