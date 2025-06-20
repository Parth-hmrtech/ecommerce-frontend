import { createSlice } from '@reduxjs/toolkit';
import {
  buyerCheckoutPayment,
  buyerVerifyPayment,
  buyerCheckPaymentStatus,
} from '../actions/buyerPaymentAction';

const initialState = {
  payments: [],     // array of all payment records
  loading: false,
  error: null,
  success: false,
};

const buyerPaymentSlice = createSlice({
  name: 'buyerPayment',
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // === CHECKOUT ===
    builder
      .addCase(buyerCheckoutPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(buyerCheckoutPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(buyerCheckoutPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // === VERIFY ===
    builder
      .addCase(buyerVerifyPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(buyerVerifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(buyerVerifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // === CHECK STATUS ===
    builder
      .addCase(buyerCheckPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerCheckPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload || []; // replaces with latest fetched payments
      })
      .addCase(buyerCheckPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearPaymentState } = buyerPaymentSlice.actions;
export default buyerPaymentSlice.reducer;
