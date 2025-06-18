// src/store/reducers/buyerReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBuyerProductById } from '../actions/buyerProductAction';

const initialState = {
  product: null,
  loading: false,
  error: null,
};

const buyerProductSlice = createSlice({
  name: 'buyerProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyerProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchBuyerProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default buyerProductSlice.reducer;
