// src/store/reducers/buyerWishlistReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerWishlist,
  addToBuyerWishlist,
  deleteFromBuyerWishlist,
} from '../actions/buyerWishlistAction';

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
      // Fetch Wishlist
      .addCase(fetchBuyerWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchBuyerWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Wishlist
      .addCase(addToBuyerWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToBuyerWishlist.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToBuyerWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete from Wishlist
      .addCase(deleteFromBuyerWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromBuyerWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteFromBuyerWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBuyerWishlistState } = buyerWishlistSlice.actions;
export default buyerWishlistSlice.reducer;
