import { createSlice } from '@reduxjs/toolkit';
import {
  addBuyerReview,
  updateBuyerReview,
  deleteBuyerReview,
} from '../actions/buyerReviewAction';

const initialState = {
  loading: false,
  error: null,
  reviewResponses: [],
};

const buyerReviewSlice = createSlice({
  name: 'buyerReview',
  initialState,
  reducers: {
    resetBuyerReviewState: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewResponses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBuyerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBuyerReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewResponses.push(action.payload); // store response
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
        const updated = action.payload;
        const index = state.reviewResponses.findIndex((r) => r.id === updated.id);
        if (index !== -1) {
          state.reviewResponses[index] = updated;
        } else {
          state.reviewResponses.push(updated);
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
        const deletedId = action.meta.arg;
        state.reviewResponses = state.reviewResponses.filter((r) => r.id !== deletedId);
      })
      .addCase(deleteBuyerReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetBuyerReviewState } = buyerReviewSlice.actions;
export default buyerReviewSlice.reducer;
