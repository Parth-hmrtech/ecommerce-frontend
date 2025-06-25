import { createSlice } from '@reduxjs/toolkit';
import { fetchSellerReviewsAction, deleteSellerReviewAction } from '../../actions/seller/sellerReviewAction';

const sellerReviewsSlice = createSlice({
  name: 'sellerReviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerReviewsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReviewsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchSellerReviewsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSellerReviewAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSellerReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter((review) => review.id !== action.payload);
      })
      .addCase(deleteSellerReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerReviewsSlice.reducer;
