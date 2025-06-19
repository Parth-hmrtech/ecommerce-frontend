// src/store/actions/buyerOrderAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// Utility: Get token
const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Place Order
export const placeBuyerOrder = createAsyncThunk(
  'buyerOrder/placeBuyerOrder',
  async ({ products, delivery_address }, { rejectWithValue }) => {
    try {
      console.log(products);
      console.log(delivery_address);
      
      
      const response = await apiRequest({
        method: 'POST',
        url: 'http://localhost:3008/api/buyer/orders',
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
);

// Fetch All Orders
export const fetchBuyerOrders = createAsyncThunk(
  'buyerOrder/fetchBuyerOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: 'http://localhost:3008/api/buyer/orders',
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

// Fetch Single Order
export const fetchBuyerOrderById = createAsyncThunk(
  'buyerOrder/fetchBuyerOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `http://localhost:3008/api/buyer/orders/${orderId}`,
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

// Update Order Address
export const updateBuyerOrderAddress = createAsyncThunk(
  'buyerOrder/updateBuyerOrderAddress',
  async ({ orderId, delivery_address }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `http://localhost:3008/api/buyer/orders/${orderId}/update-address`,
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

// Delete Order
export const deleteBuyerOrder = createAsyncThunk(
  'buyerOrder/deleteBuyerOrder',
  async (orderId, { rejectWithValue }) => {
    console.log(orderId);
    
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `http://localhost:3008/api/buyer/orders/${orderId}`,
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
