import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerReviewByProductIdAction,
  addBuyerReviewAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
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
      .addCase(fetchBuyerReviewByProductIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerReviewByProductIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchBuyerReviewByProductIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(addBuyerReviewAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBuyerReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addBuyerReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(updateBuyerReviewAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBuyerReviewAction.fulfilled, (state, action) => {
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
      .addCase(updateBuyerReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(deleteBuyerReviewAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuyerReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.items = state.items.filter((r) => r.id !== deletedId);
      })
      .addCase(deleteBuyerReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetBuyerReviewState } = buyerReviewSlice.actions;
export default buyerReviewSlice.reducer;
