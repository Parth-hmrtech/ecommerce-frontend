import { createSlice } from '@reduxjs/toolkit';
import { fetchBuyerProductByIdAction } from '../../actions/buyer/buyer-product.action';

const initialState = {
  product: null,
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const buyerProductSlice = createSlice({
  name: 'buyerProduct',
  initialState,
  reducers: {
    clearBuyerProductState: (state) => {
      state.product = null;
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    // === Fetch Product By ID ===
    builder.addCase(fetchBuyerProductByIdAction.pending, (state) => {
      state.apiName = 'buyerProduct/fetchById';
      state.loading = 'buyerProduct/fetchById';
    });
    builder.addCase(fetchBuyerProductByIdAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Product fetched successfully';
      state.product = payload;
    });
    builder.addCase(fetchBuyerProductByIdAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export const { clearBuyerProductState } = buyerProductSlice.actions;
export default buyerProductSlice.reducer;
