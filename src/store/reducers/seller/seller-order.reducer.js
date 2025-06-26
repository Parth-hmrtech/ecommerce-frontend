import { createSlice } from '@reduxjs/toolkit';
import { fetchSellerOrdersAction } from '../../actions/seller/seller-order.action';

const initialState = {
  list: [],
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const sellerOrderSlice = createSlice({
  name: 'sellerOrders',
  initialState,
  reducers: {
    clearSellerOrderState: (state) => {
      state.list = [];
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSellerOrdersAction.pending, (state) => {
      state.apiName = 'seller/fetchOrders';
      state.loading = 'seller/fetchOrders';
    });

    builder.addCase(fetchSellerOrdersAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Orders fetched successfully';
      state.list = payload || [];
    });

    builder.addCase(fetchSellerOrdersAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export const { clearSellerOrderState } = sellerOrderSlice.actions;
export default sellerOrderSlice.reducer;
