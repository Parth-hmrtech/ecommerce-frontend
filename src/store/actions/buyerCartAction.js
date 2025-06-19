// src/store/actions/buyerCartAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';
import { PlayArrow, PlayLesson } from '@mui/icons-material';

const BASE_URL = 'http://localhost:3008/api/buyer/cart';

// Utility to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ✅ Fetch Cart Items
export const fetchBuyerCart = createAsyncThunk(
  'buyerCart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: BASE_URL,
        headers: getAuthHeaders(),
      });
      return response.data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

// ✅ Add to Cart
export const addToBuyerCart = createAsyncThunk(
  'buyerCart/add',
  async ({ product_id, quantity }, { rejectWithValue }) => {
    try {
      console.log("Product ID:", product_id);
      console.log("Quantity:", quantity);

      const response = await apiRequest({
        method: 'POST',
        url: BASE_URL,
        headers: getAuthHeaders(),
        data: { product_id, quantity }, // Build payload here
      });

      return response.data?.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || 'Failed to add item to cart'
      );
    }
  }
);
export const updateBuyerCart = createAsyncThunk(
  'buyerCart/update',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `${BASE_URL}/${id}`, // Append ID to the endpoint
        headers: getAuthHeaders(),
        data: { quantity: String(quantity) }, // Send only quantity in body
      });
      return response.data?.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || 'Failed to update cart'
      );
    }
  }
);


// ✅ Delete Cart Item
export const deleteBuyerCart = createAsyncThunk(
  'buyerCart/delete',
  async (id, { rejectWithValue }) => {
    console.log(id);
    
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `${BASE_URL}/${id}`,
        headers: getAuthHeaders(),
      });
      return response.data?.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || 'Failed to delete item'
      );
    }
  }
);
