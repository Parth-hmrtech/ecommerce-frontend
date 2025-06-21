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
      .addCase(fetchBuyerReviewByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerReviewByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchBuyerReviewByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

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

      .addCase(updateBuyerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBuyerReview.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReview = action.payload;
        if (!updatedReview || !updatedReview.id) {
          state.error = 'Invalid review update payload';
          return;
        }
        const index = state.items.findIndex((r) => r.id === updatedReview.id);
        if (index !== -1) {
          state.items[index] = updatedReview;
        } else {
          state.items.push(updatedReview);
        }
      })
      .addCase(updateBuyerReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

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
