// store/actions/sellerReviewAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// GET Seller Reviews: http://localhost:3008/api/seller/reviews/
export const fetchSellerReviewsAction = createAsyncThunk(
  'seller/fetchReviews',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');

      const response = await apiRequest({
        method: 'GET',
        url: 'http://localhost:3008/api/seller/reviews/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data; // assuming `data` holds the review array
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to fetch reviews';
      return rejectWithValue(message);
    }
  }
);
export const deleteSellerReviewAction = createAsyncThunk(
  'seller/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');

      const response = await apiRequest({
        method: 'DELETE',
        url: `http://localhost:3008/api/seller/reviews/${reviewId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return reviewId; // Return the deleted review ID to remove it from Redux state
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to delete review';
      return rejectWithValue(message);
    }
  }
);