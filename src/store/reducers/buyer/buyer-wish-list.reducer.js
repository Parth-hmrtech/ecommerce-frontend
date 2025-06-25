// src/store/reducers/buyerWishlistReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerWishlistAction,
  addToBuyerWishlistAction,
  deleteFromBuyerWishlistAction,
} from '../../actions/buyer/buyer-wishlist.action';

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
    builder
      .addCase(fetchBuyerWishlistAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerWishlistAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchBuyerWishlistAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToBuyerWishlistAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToBuyerWishlistAction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToBuyerWishlistAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteFromBuyerWishlistAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromBuyerWishlistAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload.wishlistId);
      })
      .addCase(deleteFromBuyerWishlistAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBuyerWishlistState } = buyerWishlistSlice.actions;
export default buyerWishlistSlice.reducer;
