import { createSlice } from '@reduxjs/toolkit';
import {
  buyerCheckoutPayment,
  buyerVerifyPayment,
  buyerCheckPaymentStatus,
} from '../actions/buyerPaymentAction';

const initialState = {
  loading: false,
  error: null,
  paymentStatusByOrder: [], // ✅ Array of full response objects per order
};

const buyerPaymentSlice = createSlice({
  name: 'buyerPayment',
  initialState,
  reducers: {
    resetBuyerPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.paymentStatusByOrder = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Checkout
      .addCase(buyerCheckoutPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerCheckoutPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(buyerCheckoutPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Verify
      .addCase(buyerVerifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerVerifyPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(buyerVerifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ✅ Store full response from checkPaymentStatus
      .addCase(buyerCheckPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerCheckPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload;

        if (response?.order_id) {
          const existing = state.paymentStatusByOrder.find((entry) => entry.order_id === response.order_id);
          if (existing) {
            Object.assign(existing, response); // 🔁 Update all fields
          } else {
            state.paymentStatusByOrder.push(response); // ➕ Add new full entry
          }
        }
      })
      .addCase(buyerCheckPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetBuyerPaymentState } = buyerPaymentSlice.actions;
export default buyerPaymentSlice.reducer;
