import { createSlice } from '@reduxjs/toolkit';
import {
  placeBuyerOrderAction,
  fetchBuyerOrdersAction,
  fetchBuyerOrderByIdAction,
  updateBuyerOrderAddressAction,
  deleteBuyerOrderAction,
} from '@/store/actions/buyer/buyer-order.action';

const initialState = {
  orders: [],
  order: null,
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const buyerOrderSlice = createSlice({
  name: 'buyerOrder',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(placeBuyerOrderAction.pending, (state) => {
      state.apiName = 'buyerOrder/place';
      state.loading = 'buyerOrder/place';
    });
    builder.addCase(placeBuyerOrderAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Order placed successfully';
      state.orders.push(payload);
    });
    builder.addCase(placeBuyerOrderAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });

    builder.addCase(fetchBuyerOrdersAction.pending, (state) => {
      state.apiName = 'buyerOrder/fetchAll';
      state.loading = 'buyerOrder/fetchAll';
    });
    builder.addCase(fetchBuyerOrdersAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Orders fetched successfully';
      state.orders = payload;
    });
    builder.addCase(fetchBuyerOrdersAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });

    builder.addCase(fetchBuyerOrderByIdAction.pending, (state) => {
      state.apiName = 'buyerOrder/fetchById';
      state.loading = 'buyerOrder/fetchById';
    });
    builder.addCase(fetchBuyerOrderByIdAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Order details loaded';
      state.order = payload;
    });
    builder.addCase(fetchBuyerOrderByIdAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });

    builder.addCase(updateBuyerOrderAddressAction.pending, (state) => {
      state.apiName = 'buyerOrder/updateAddress';
      state.loading = 'buyerOrder/updateAddress';
    });
    builder.addCase(updateBuyerOrderAddressAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Address updated successfully';
      state.order = payload;
    });
    builder.addCase(updateBuyerOrderAddressAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });

    builder.addCase(deleteBuyerOrderAction.pending, (state) => {
      state.apiName = 'buyerOrder/delete';
      state.loading = 'buyerOrder/delete';
    });
    builder.addCase(deleteBuyerOrderAction.fulfilled, (state, action) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Order deleted successfully';
      state.orders = state.orders.filter((o) => o.id !== action.meta.arg);
    });
    builder.addCase(deleteBuyerOrderAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) state.message = payload.message;
    });
  },
});

export const { clearOrderState } = buyerOrderSlice.actions;
export default buyerOrderSlice.reducer;
