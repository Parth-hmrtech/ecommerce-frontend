import { createSlice } from '@reduxjs/toolkit';
import {
  placeBuyerOrderAction,
  fetchBuyerOrdersAction,
  fetchBuyerOrderByIdAction,
  updateBuyerOrderAddressAction,
  deleteBuyerOrderAction,
} from '../../actions/buyer/buyerOrderAction';

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
    builder
      .addCase(placeBuyerOrderAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(placeBuyerOrderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders.push(action.payload);
      })
      .addCase(placeBuyerOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBuyerOrdersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchBuyerOrdersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBuyerOrderByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerOrderByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchBuyerOrderByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateBuyerOrderAddressAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateBuyerOrderAddressAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(updateBuyerOrderAddressAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBuyerOrderAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteBuyerOrderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders = state.orders.filter((o) => o.id !== action.meta.arg);
      })
      .addCase(deleteBuyerOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = buyerOrderSlice.actions;
export default buyerOrderSlice.reducer;
