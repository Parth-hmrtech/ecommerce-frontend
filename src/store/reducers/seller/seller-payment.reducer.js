import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSellerPaymentsAction,
  fetchSellerEarningsAction,
} from '../../actions/seller/seller-payment.action';

const sellerPaymentSlice = createSlice({
  name: 'sellerPayments',
  initialState: {
    loading: false,
    payments: [],
    earnings: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerPaymentsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerPaymentsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchSellerPaymentsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSellerEarningsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerEarningsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.earnings = action.payload;
      })
      .addCase(fetchSellerEarningsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerPaymentSlice.reducer;
