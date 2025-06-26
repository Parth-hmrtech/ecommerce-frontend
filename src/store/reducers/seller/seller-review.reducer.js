import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSellerReviewsAction,
  deleteSellerReviewAction,
} from '../../actions/seller/seller-review.action';

const initialState = {
  reviews: [],
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
};

const sellerReviewsSlice = createSlice({
  name: 'sellerReviews',
  initialState,
  reducers: {
    clearSellerReviewState: (state) => {
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // 🟡 FETCH REVIEWS
    builder.addCase(fetchSellerReviewsAction.pending, (state) => {
      state.apiName = 'seller/fetchReviews';
      state.loading = 'seller/fetchReviews';
    });
    builder.addCase(fetchSellerReviewsAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Reviews fetched successfully';
      state.reviews = payload;
    });
    builder.addCase(fetchSellerReviewsAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    // ❌ DELETE REVIEW
    builder.addCase(deleteSellerReviewAction.pending, (state) => {
      state.apiName = 'seller/deleteReview';
      state.loading = 'seller/deleteReview';
    });
    builder.addCase(deleteSellerReviewAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Review deleted successfully';
      state.reviews = state.reviews.filter((review) => review.id !== payload);
    });
    builder.addCase(deleteSellerReviewAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export const { clearSellerReviewState } = sellerReviewsSlice.actions;
export default sellerReviewsSlice.reducer;
