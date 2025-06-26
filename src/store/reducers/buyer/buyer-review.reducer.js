import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerReviewByProductIdAction,
  addBuyerReviewAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
} from '../../actions/buyer/buyer-review.action';

const initialState = {
  items: [],
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const buyerReviewSlice = createSlice({
  name: 'buyerReview',
  initialState,
  reducers: {
    resetBuyerReviewState: (state) => {
      state.items = [];
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    // === Fetch Reviews ===
    builder.addCase(fetchBuyerReviewByProductIdAction.pending, (state) => {
      state.apiName = 'buyerReview/fetchByProductId';
      state.loading = 'buyerReview/fetchByProductId';
    });
    builder.addCase(fetchBuyerReviewByProductIdAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Reviews loaded';
      state.items = payload || [];
    });
    builder.addCase(fetchBuyerReviewByProductIdAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });

    // === Add Review ===
    builder.addCase(addBuyerReviewAction.pending, (state) => {
      state.apiName = 'buyerReview/add';
      state.loading = 'buyerReview/add';
    });
    builder.addCase(addBuyerReviewAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Review added';
      state.items.push(payload);
    });
    builder.addCase(addBuyerReviewAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });

    // === Update Review ===
    builder.addCase(updateBuyerReviewAction.pending, (state) => {
      state.apiName = 'buyerReview/update';
      state.loading = 'buyerReview/update';
    });
    builder.addCase(updateBuyerReviewAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Review updated';

      if (!payload || !payload.id) {
        state.alertType = 'error';
        state.message = 'Invalid review update payload';
        return;
      }

      const index = state.items.findIndex((r) => r.id === payload.id);
      if (index !== -1) {
        state.items[index] = payload;
      } else {
        state.items.push(payload);
      }
    });
    builder.addCase(updateBuyerReviewAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });

    // === Delete Review ===
    builder.addCase(deleteBuyerReviewAction.pending, (state) => {
      state.apiName = 'buyerReview/delete';
      state.loading = 'buyerReview/delete';
    });
    builder.addCase(deleteBuyerReviewAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Review deleted';
      state.items = state.items.filter((r) => r.id !== payload);
    });
    builder.addCase(deleteBuyerReviewAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });
  },
});

export const { resetBuyerReviewState } = buyerReviewSlice.actions;
export default buyerReviewSlice.reducer;
