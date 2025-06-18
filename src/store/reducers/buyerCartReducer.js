// src/store/reducers/buyerCartReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerCart,
  addToBuyerCart,
  updateBuyerCart,
  deleteBuyerCart,
} from '../actions/buyerCartAction';

const buyerCartSlice = createSlice({
  name: 'buyerCart',
  initialState: {
    cart: [],       // ✅ renamed from cartItems to cart
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: Add this if you want to clear cart manually (e.g. after checkout or logout)
    clearBuyerCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ FETCH
      .addCase(fetchBuyerCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchBuyerCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ ADD
      .addCase(addToBuyerCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToBuyerCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
      })
      .addCase(addToBuyerCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ UPDATE
      .addCase(updateBuyerCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBuyerCart.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cart.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.cart[index] = action.payload;
        }
      })
      .addCase(updateBuyerCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ DELETE
      .addCase(deleteBuyerCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuyerCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteBuyerCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBuyerCart } = buyerCartSlice.actions; // optional
export default buyerCartSlice.reducer;
