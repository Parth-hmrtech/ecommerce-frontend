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
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBuyerCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { clearBuyerCart } = buyerCartSlice.actions;
export default buyerCartSlice.reducer;
