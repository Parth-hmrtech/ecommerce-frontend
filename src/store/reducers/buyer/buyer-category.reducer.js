import { createSlice } from '@reduxjs/toolkit';
import { fetchBuyerCategoriesAction } from '../../actions/buyer/buyer-category.action';

const initialState = {
  categories: [],
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const buyerSlice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
    clearBuyerState: (state) => {
      state.error = false;
      state.message = '';
      state.alertType = '';
      state.apiName = '';
      state.loading = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuyerCategoriesAction.pending, (state) => {
      state.apiName = "buyer/fetchCategories";
      state.loading = "buyer/fetchCategories";
    });

    builder.addCase(fetchBuyerCategoriesAction.fulfilled, (state, { payload }) => {
      state.loading = "";
      state.alertType = "success";
      state.message = "Categories fetched successfully";
      state.categories = payload || [];
    });

    builder.addCase(fetchBuyerCategoriesAction.rejected, (state, { payload }) => {
      state.loading = "";
      state.alertType = "error";
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export const { clearBuyerState } = buyerSlice.actions;
export default buyerSlice.reducer;
