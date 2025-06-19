// src/store/actions/buyerPaymentAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// Utility to get token from localStorage
const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ✅ Buyer Payment: Checkout
export const buyerCheckoutPayment = createAsyncThunk(
  'buyerPayment/checkout',
  async ({ order_id, seller_id, amount, payment_method, transaction_id }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: 'http://localhost:3008/api/buyer/payments/checkout',
        data: {
          order_id,
          seller_id,
          amount,
          payment_method,
          transaction_id,
        },
        headers: getTokenHeader(),
      });

      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Checkout failed'
      );
    }
  }
);

// ✅ Buyer Payment: Verify
export const buyerVerifyPayment = createAsyncThunk(
  'buyerPayment/verify',
  async ({ status, transaction_id }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: 'http://localhost:3008/api/buyer/payments/verify',
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

// ✅ Buyer Payment: Check Status
export const buyerCheckPaymentStatus = createAsyncThunk(
  'buyerPayment/checkStatus',
  async ({ order_id }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `http://localhost:3008/api/buyer/payments/status/${order_id}`,
        headers: getTokenHeader(),
      });
      console.log(response);
      
      return response.data?.data; // e.g., { status: "success", transaction_id: "..." }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to fetch payment status'
      );
    }
  }
);
