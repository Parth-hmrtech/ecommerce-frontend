import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/hooks/useApiRequest';

const BASE_URL = '/buyer/payments';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const buyerCheckoutPaymentAction = createAsyncThunk(
  'buyerPayment/checkout',
  async ({ order_id, seller_id, amount, payment_method, transaction_id }, { fulfillWithValue, rejectWithValue }) => {
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
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const buyerVerifyPaymentAction = createAsyncThunk(
  'buyerPayment/verify',
  async ({ status, transaction_id }, { fulfillWithValue, rejectWithValue }) => {
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
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const buyerCheckPaymentStatusAction = createAsyncThunk(
  'buyerPayment/checkStatus',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `${BASE_URL}/status`,
        headers: getTokenHeader(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

export {
  buyerCheckoutPaymentAction,
  buyerVerifyPaymentAction,
  buyerCheckPaymentStatusAction,
};
