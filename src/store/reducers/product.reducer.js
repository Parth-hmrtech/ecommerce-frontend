import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsAction } from '@/store/actions/product.actions';

const initialState = {
  products: [],
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.products = [];
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.apiName = 'products/fetch';
        state.loading = 'products/fetch';
        state.error = false;
        state.alertType = '';
        state.message = '';
      })
      .addCase(fetchProductsAction.fulfilled, (state, { payload }) => {
        state.loading = '';
        state.alertType = 'success';
        state.message = 'Products loaded successfully';
        state.products = payload;
      })
      .addCase(fetchProductsAction.rejected, (state, { payload }) => {
        state.loading = '';
        state.alertType = 'error';
        state.error = true;
        if (payload) state.message = payload.message;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
