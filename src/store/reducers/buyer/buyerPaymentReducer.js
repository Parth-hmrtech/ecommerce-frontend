import { createSlice } from '@reduxjs/toolkit';
import {
  buyerCheckoutPaymentAction,
  buyerVerifyPaymentAction,
  buyerCheckPaymentStatusAction,
} from '../../actions/buyer/buyerPaymentAction';

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
    builder
      .addCase(buyerCheckoutPaymentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerCheckoutPaymentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutData = action.payload || null;
      })
      .addCase(buyerCheckoutPaymentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(buyerVerifyPaymentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerVerifyPaymentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyData = action.payload || null;
      })
      .addCase(buyerVerifyPaymentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(buyerCheckPaymentStatusAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerCheckPaymentStatusAction.fulfilled, (state, action) => {
        state.loading = false;
        state.buyerCheckPayments = action.payload || [];
      })
      .addCase(buyerCheckPaymentStatusAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearPaymentState } = buyerPaymentSlice.actions;
export default buyerPaymentSlice.reducer;
