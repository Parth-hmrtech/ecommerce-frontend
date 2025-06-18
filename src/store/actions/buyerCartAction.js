import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const BASE_URL = 'http://localhost:3008/api/buyer/cart';
const token = localStorage.getItem('access_token');
const headers = { Authorization: `Bearer ${token}` };

// ✅ Fetch Cart Items
export const fetchBuyerCart = createAsyncThunk(
  'buyerCart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: BASE_URL,
        headers,
      });      
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

// ✅ Add to Cart
export const addToBuyerCart = createAsyncThunk(
  'buyerCart/add',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: BASE_URL,
        headers,
        data: payload,
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to add to cart');
    }
  }
);

// ✅ Update Cart Item
export const updateBuyerCart = createAsyncThunk(
  'buyerCart/update',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: BASE_URL,
        headers,
        data: payload,
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to update cart');
    }
  }
);

// ✅ Delete Cart Item
// ✅ Example export
export const deleteBuyerCart = createAsyncThunk(
  'buyerCart/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'DELETE',
        url: `http://localhost:3008/api/buyer/cart/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete item');
    }
  }
);
