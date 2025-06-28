import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchBuyerReviewByProductIdAction = createAsyncThunk(
  'buyerReview/fetchByProductId',
  async (productId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/buyer/reviews/${productId}`,
        headers: getTokenHeader(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const addBuyerReviewAction = createAsyncThunk(
  'buyerReview/add',
  async ({ product_id, order_id, buyer_id, seller_id, rating, comment }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/buyer/review',
        data: { product_id, order_id, buyer_id, seller_id, rating, comment },
        headers: getTokenHeader(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const updateBuyerReviewAction = createAsyncThunk(
  'buyerReview/update',
  async ({ id, rating, comment }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/buyer/reviews/${id}`,
        data: { rating, comment },
        headers: getTokenHeader(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const deleteBuyerReviewAction = createAsyncThunk(
  'buyerReview/delete',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/buyer/reviews/${id}`,
        headers: getTokenHeader(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

export {
  fetchBuyerReviewByProductIdAction,
  addBuyerReviewAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
};
