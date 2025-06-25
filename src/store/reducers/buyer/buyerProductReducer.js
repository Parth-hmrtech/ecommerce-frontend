import { createSlice } from '@reduxjs/toolkit';
import { fetchBuyerProductByIdAction } from '../../actions/buyer/buyerProductAction';

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
      .addCase(fetchBuyerProductByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerProductByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchBuyerProductByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default buyerProductSlice.reducer;
