import { createSlice } from '@reduxjs/toolkit';
import {
  placeBuyerOrder,
  fetchBuyerOrders,
  fetchBuyerOrderById,
  updateBuyerOrderAddress,
  deleteBuyerOrder,
} from '../actions/buyerOrderAction';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  success: false,
};

const buyerOrderSlice = createSlice({
  name: 'buyerOrder',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Place Order
    builder
      .addCase(placeBuyerOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(placeBuyerOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders.push(action.payload); // optional
      })
      .addCase(placeBuyerOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch All Orders
    builder
      .addCase(fetchBuyerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchBuyerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Single Order
    builder
      .addCase(fetchBuyerOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchBuyerOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Order Address
    builder
      .addCase(updateBuyerOrderAddress.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateBuyerOrderAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(updateBuyerOrderAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Order
    builder
      .addCase(deleteBuyerOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteBuyerOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders = state.orders.filter((o) => o.id !== action.meta.arg);
      })
      .addCase(deleteBuyerOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = buyerOrderSlice.actions;
export default buyerOrderSlice.reducer;
