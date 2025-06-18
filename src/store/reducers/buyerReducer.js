// src/store/slices/buyerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBuyerCategories } from '../actions/buyerAction';

const buyerSlice = createSlice({
  name: 'buyer',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyerCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchBuyerCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default buyerSlice.reducer;
