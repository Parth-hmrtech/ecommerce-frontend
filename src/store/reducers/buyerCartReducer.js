import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerCartAction,
  addToBuyerCartAction,
  updateBuyerCartAction,
  deleteBuyerCartAction,
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
      .addCase(fetchBuyerCartAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchBuyerCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToBuyerCartAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToBuyerCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
      })
      .addCase(addToBuyerCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateBuyerCartAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBuyerCartAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cart.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.cart[index] = action.payload;
        }
      })
      .addCase(updateBuyerCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBuyerCartAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuyerCartAction.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming action.payload contains the id of the deleted item
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteBuyerCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBuyerCart } = buyerCartSlice.actions;
export default buyerCartSlice.reducer;
