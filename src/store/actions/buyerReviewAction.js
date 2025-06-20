// src/store/actions/buyerReviewAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ✅ NEW: Get review by product ID
export const fetchBuyerReviewByProductId = createAsyncThunk(
  'buyerReview/fetchByProductId',
  async (productId, { rejectWithValue }) => {

    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/buyer/reviews/${productId}`,
        headers: getTokenHeader(),
      });
      // console.log("from review",response);

      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to fetch review'
      );
    }
  }
);

// Add a new review
export const addBuyerReview = createAsyncThunk(
  'buyerReview/add',
  async ({ product_id, order_id, buyer_id, seller_id, rating, comment }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/buyer/review',
        data: {
          product_id,
          order_id,
          buyer_id,
          seller_id,
          rating,
          comment,
        },
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

// Update an existing review
export const updateBuyerReview = createAsyncThunk(
  'buyerReview/update',
  async ({ id, rating, comment }, { rejectWithValue }) => {
    console.log("Updating review:", id);

    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/buyer/reviews/${id}`, // becomes /buyer/reviews/undefined 😬
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


// Delete a review
export const deleteBuyerReview = createAsyncThunk(
  'buyerReview/delete',
  async (id, { rejectWithValue }) => {
    try {
      console.log("delete", id);

      const response = await apiRequest({
        method: 'DELETE',
        url: `/buyer/reviews/${id}`,
        headers: getTokenHeader(),
      });
      console.log(response);

      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to delete review'
      );
    }
  }
);
