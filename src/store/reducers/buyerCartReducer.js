import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerCartAction,
  addToBuyerCartAction,
  updateBuyerCartAction,
  deleteBuyerCartAction,
  deleteBuyerIdCartAction, // <- include this
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
      // Fetch
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

      // Add
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

      // Update
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

      // Delete single item
      .addCase(deleteBuyerCartAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuyerCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteBuyerCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBuyerIdCartAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuyerIdCartAction.fulfilled, (state) => {
        state.loading = false;
        state.cart = []; 
      })
      .addCase(deleteBuyerIdCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete buyer cart';
      });
  },
});

export const { clearBuyerCart } = buyerCartSlice.actions;
export default buyerCartSlice.reducer;
