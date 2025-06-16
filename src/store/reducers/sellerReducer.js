// src/store/reducers/categoryReducer.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories } from '../actions/sellerAction';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Add sync reducers here if needed later (e.g., addCategory, removeCategory, etc.)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load categories';
      });
  },
});

export default categorySlice.reducer;
