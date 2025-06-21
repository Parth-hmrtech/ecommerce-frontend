import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchBuyerReviewByProductIdAction = createAsyncThunk(
  'buyerReview/fetchByProductId',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/buyer/reviews/${productId}`,
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to fetch review'
      );
    }
  }
);

const addBuyerReviewAction = createAsyncThunk(
  'buyerReview/add',
  async ({ product_id, order_id, buyer_id, seller_id, rating, comment }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/buyer/review',
        data: { product_id, order_id, buyer_id, seller_id, rating, comment },
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to add review'
      );
    }
  }
);

const updateBuyerReviewAction = createAsyncThunk(
  'buyerReview/update',
  async ({ id, rating, comment }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/buyer/reviews/${id}`,
        data: { rating, comment },
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to update review'
      );
    }
  }
);

const deleteBuyerReviewAction = createAsyncThunk(
  'buyerReview/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/buyer/reviews/${id}`,
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to delete review'
      );
    }
  }
);

export {
  fetchBuyerReviewByProductIdAction,
  addBuyerReviewAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
};
