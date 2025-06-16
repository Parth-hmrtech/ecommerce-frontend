import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions/productActions';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
