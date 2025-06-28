import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerWishlistAction,
  addToBuyerWishlistAction,
  deleteFromBuyerWishlistAction,
} from '@/store/actions/buyer/buyer-wishlist.action';

const buyerWishlistSlice = createSlice({
  name: 'buyerWishlist',
  initialState: {
    loading: false,
    items: [],
    error: null,
  },
  reducers: {
    resetBuyerWishlistState: (state) => {
      state.loading = false;
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(fetchBuyerWishlistAction.pending, (state) => {
    state.apiName = 'buyerWishlist/fetch';
    state.loading = 'buyerWishlist/fetch';
  });
  builder.addCase(fetchBuyerWishlistAction.fulfilled, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'success';
    state.message = 'Wishlist fetched successfully';
    state.items = Array.isArray(payload) ? payload : [];
  });
  builder.addCase(fetchBuyerWishlistAction.rejected, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'error';
    if (payload) {
      state.message = payload.message;
    }
  });

  builder.addCase(addToBuyerWishlistAction.pending, (state) => {
    state.apiName = 'buyerWishlist/add';
    state.loading = 'buyerWishlist/add';
  });
  builder.addCase(addToBuyerWishlistAction.fulfilled, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'success';
    state.message = 'Item added to wishlist';
    if (payload) {
      state.items.push(payload);
    }
  });
  builder.addCase(addToBuyerWishlistAction.rejected, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'error';
    if (payload) {
      state.message = payload.message;
    }
  });

  builder.addCase(deleteFromBuyerWishlistAction.pending, (state) => {
    state.apiName = 'buyerWishlist/delete';
    state.loading = 'buyerWishlist/delete';
  });
  builder.addCase(deleteFromBuyerWishlistAction.fulfilled, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'success';
    state.message = 'Item removed from wishlist';
    state.items = state.items.filter((item) => item.id !== payload.wishlistId);
  });
  builder.addCase(deleteFromBuyerWishlistAction.rejected, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
  });
},
});

export const { resetBuyerWishlistState } = buyerWishlistSlice.actions;
export default buyerWishlistSlice.reducer;
