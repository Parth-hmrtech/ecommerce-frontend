// src/store/actions/sellerReviewAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// Reusable auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ✅ Fetch Seller Reviews
export const fetchSellerReviewsAction = createAsyncThunk(
  'seller/fetchReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/reviews/',
        headers: getAuthHeaders(),
      });
      return response.data.data; // Assuming response contains data.data
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to fetch reviews';
      return rejectWithValue(message);
    }
  }
);

// ✅ Delete Seller Review
export const deleteSellerReviewAction = createAsyncThunk(
  'seller/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      await apiRequest({
        method: 'DELETE',
        url: `/seller/reviews/${reviewId}`,
        headers: getAuthHeaders(),
      });

      return reviewId; // Used to remove from state in reducer
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to delete review';
      return rejectWithValue(message);
    }
  }
);
