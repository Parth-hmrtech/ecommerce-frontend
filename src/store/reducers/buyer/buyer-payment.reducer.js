import { createSlice } from '@reduxjs/toolkit';
import {
  buyerCheckoutPaymentAction,
  buyerVerifyPaymentAction,
  buyerCheckPaymentStatusAction,
} from '../../actions/buyer/buyer-payment.action';

const initialState = {
  loading: false,
  error: null,
  checkoutData: null,
  verifyData: null,
  buyerCheckPayments: [],
};

const buyerPaymentSlice = createSlice({
  name: 'buyerPayment',
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.checkoutData = null;
      state.verifyData = null;
      state.buyerCheckPayments = [];
    },
  },
  extraReducers: (builder) => {
  // === Checkout Payment ===
  builder.addCase(buyerCheckoutPaymentAction.pending, (state) => {
    state.apiName = 'buyerPayment/checkout';
    state.loading = 'buyerPayment/checkout';
  });
  builder.addCase(buyerCheckoutPaymentAction.fulfilled, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'success';
    state.message = payload?.message || 'Checkout initiated';
    state.checkoutData = payload || null;
  });
  builder.addCase(buyerCheckoutPaymentAction.rejected, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'error';
    if (payload) {
      state.message = payload.message;
    }
  });

  // === Verify Payment ===
  builder.addCase(buyerVerifyPaymentAction.pending, (state) => {
    state.apiName = 'buyerPayment/verify';
    state.loading = 'buyerPayment/verify';
  });
  builder.addCase(buyerVerifyPaymentAction.fulfilled, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'success';
    state.message = payload?.message || 'Payment verified';
    state.verifyData = payload || null;
  });
  builder.addCase(buyerVerifyPaymentAction.rejected, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'error';
    if (payload) {
      state.message = payload.message;
    }
  });

  // === Check Payment Status ===
  builder.addCase(buyerCheckPaymentStatusAction.pending, (state) => {
    state.apiName = 'buyerPayment/checkStatus';
    state.loading = 'buyerPayment/checkStatus';
  });
  builder.addCase(buyerCheckPaymentStatusAction.fulfilled, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'success';
    state.message = payload?.message || 'Payment status fetched';
    state.buyerCheckPayments = payload || [];
  });
  builder.addCase(buyerCheckPaymentStatusAction.rejected, (state, { payload }) => {
    state.loading = '';
    state.alertType = 'error';
    if (payload) {
      state.message = payload.message;
    }
  });
}

});

export const { clearPaymentState } = buyerPaymentSlice.actions;
export default buyerPaymentSlice.reducer;
