import { createSlice } from '@reduxjs/toolkit';
import { fetchBuyerCategoriesAction } from '../../actions/buyer/buyerAction';

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
      .addCase(fetchBuyerCategoriesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerCategoriesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchBuyerCategoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default buyerSlice.reducer;
