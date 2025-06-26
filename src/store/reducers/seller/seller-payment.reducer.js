import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSellerPaymentsAction,
  fetchSellerEarningsAction,
} from '../../actions/seller/seller-payment.action';

const initialState = {
  payments: [],
  earnings: null,
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const sellerPaymentSlice = createSlice({
  name: 'sellerPayments',
  initialState,
  reducers: {
    clearSellerPaymentState: (state) => {
      state.payments = [];
      state.earnings = null;
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    // === Fetch Seller Payments ===
    builder.addCase(fetchSellerPaymentsAction.pending, (state) => {
      state.apiName = 'seller/fetchPayments';
      state.loading = 'seller/fetchPayments';
      state.error = false;
      state.alertType = '';
      state.message = '';
    });

    builder.addCase(fetchSellerPaymentsAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Payments fetched successfully';
      state.payments = payload || [];
    });

    builder.addCase(fetchSellerPaymentsAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });

    // === Fetch Seller Earnings ===
    builder.addCase(fetchSellerEarningsAction.pending, (state) => {
      state.apiName = 'seller/fetchEarnings';
      state.loading = 'seller/fetchEarnings';
      state.error = false;
      state.alertType = '';
      state.message = '';
    });

    builder.addCase(fetchSellerEarningsAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Earnings fetched successfully';
      state.earnings = payload;
    });

    builder.addCase(fetchSellerEarningsAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export const { clearSellerPaymentState } = sellerPaymentSlice.actions;
export default sellerPaymentSlice.reducer;
