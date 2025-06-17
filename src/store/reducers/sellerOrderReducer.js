import { createSlice } from '@reduxjs/toolkit';
import { fetchSellerOrdersAction } from '../actions/sellerOrderAction';

const orderSlice = createSlice({
  name: 'sellerOrders',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrdersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchSellerOrdersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      });
  },
});

export default orderSlice.reducer;
