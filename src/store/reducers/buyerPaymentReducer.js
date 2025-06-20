import { createSlice } from '@reduxjs/toolkit';
import {
  buyerCheckoutPayment,
  buyerVerifyPayment,
  buyerCheckPaymentStatus,
} from '../actions/buyerPaymentAction';

const initialState = {
  loading: false,
  error: null,
  checkoutData: null,        // result from buyerCheckoutPayment
  verifyData: null,          // result from buyerVerifyPayment
  buyerCheckPayments: [],    // result from buyerCheckPaymentStatus
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
    builder
      .addCase(buyerCheckoutPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerCheckoutPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutData = action.payload || null;
      })
      .addCase(buyerCheckoutPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // === Verify Payment ===
    builder
      .addCase(buyerVerifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerVerifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyData = action.payload || null;
      })
      .addCase(buyerVerifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // === Check Payment Status ===
    builder
      .addCase(buyerCheckPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerCheckPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.buyerCheckPayments = action.payload || [];
      })
      .addCase(buyerCheckPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearPaymentState } = buyerPaymentSlice.actions;
export default buyerPaymentSlice.reducer;
