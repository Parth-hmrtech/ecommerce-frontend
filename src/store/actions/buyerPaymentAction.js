// src/store/actions/buyerPaymentAction.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const BASE_URL = '/buyer/payments'; // Use relative paths if apiRequest uses baseURL
const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// 1. Checkout Payment
export const buyerCheckoutPayment = createAsyncThunk(
  'buyerPayment/checkout',
  async ({ order_id, seller_id, amount, payment_method, transaction_id }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: `${BASE_URL}/checkout`,
        data: {
          order_id,
          seller_id,
          amount,
          payment_method,
          transaction_id,
        },
        headers: getTokenHeader(),
      });

      return response.data?.data; // Returns checkout response
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Checkout failed'
      );
    }
  }
);

// 2. Verify Payment
export const buyerVerifyPayment = createAsyncThunk(
  'buyerPayment/verify',
  async ({ status, transaction_id }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: `${BASE_URL}/verify`,
        data: {
          status,
          transaction_id,
        },
        headers: getTokenHeader(),
      });

      return response.data?.data; 
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Payment verification failed'
      );
    }
  }
);

export const buyerCheckPaymentStatus = createAsyncThunk(
  'buyerPayment/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `${BASE_URL}/status`, // Endpoint returns all payment statuses
        headers: getTokenHeader(),
      });

      return response.data?.data; // Returns array of payment statuses
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to fetch payment status'
      );
    }
  }
);
