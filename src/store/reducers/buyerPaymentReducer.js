import { createSlice } from '@reduxjs/toolkit';
import {
  buyerCheckoutPayment,
  buyerVerifyPayment,
  buyerCheckPaymentStatus,
} from '../actions/buyerPaymentAction';

const buyerPaymentSlice = createSlice({
  name: 'buyerPayment',
  initialState: {
    paymentStatusByOrder: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetBuyerPaymentState: (state) => {
      state.paymentStatusByOrder = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(buyerCheckPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerCheckPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload;
        if (response?.order_id) {
          const index = state.paymentStatusByOrder.findIndex(
            (entry) => entry.order_id === response.order_id
          );
          if (index !== -1) {
            state.paymentStatusByOrder[index] = {
              ...state.paymentStatusByOrder[index],
              ...response,
            };
          } else {
            state.paymentStatusByOrder.push(response);
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
