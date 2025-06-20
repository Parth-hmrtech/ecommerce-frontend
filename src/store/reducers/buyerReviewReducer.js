// src/store/reducers/buyerReviewReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerReviewByProductId,
  addBuyerReview,
  updateBuyerReview,
  deleteBuyerReview,
} from '../actions/buyerReviewAction';

const buyerReviewSlice = createSlice({
  name: 'buyerReview',
  initialState: {
    loading: false,
    items: [],
    error: null,
  },
  reducers: {
    resetBuyerReviewState: (state) => {
      state.loading = false;
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all reviews (by product)
      .addCase(fetchBuyerReviewByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerReviewByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        
      })
      .addCase(fetchBuyerReviewByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Add review
      .addCase(addBuyerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBuyerReview.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addBuyerReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update review
      .addCase(updateBuyerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBuyerReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateBuyerReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete review
      .addCase(deleteBuyerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuyerReview.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.items = state.items.filter((r) => r.id !== deletedId);
      })
      .addCase(deleteBuyerReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetBuyerReviewState } = buyerReviewSlice.actions;
export default buyerReviewSlice.reducer;
