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

const buyerCategorySlice = createSlice({
  name: 'buyerCategory',
  initialState,
  reducers: {
    clearBuyerCategoryState: (state) => {
      state.error = false;
      state.message = '';
      state.alertType = '';
      state.apiName = '';
      state.loading = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyerCategoriesAction.pending, (state) => {
        state.apiName = "buyer/fetchCategories";
        state.loading = "buyer/fetchCategories";
      })
      .addCase(fetchBuyerCategoriesAction.fulfilled, (state, { payload }) => {
        state.loading = "";
        state.apiName = "";
        state.alertType = "success";
        state.message = "Categories fetched successfully";
        state.categories = payload?.categories || [];
      })
      .addCase(fetchBuyerCategoriesAction.rejected, (state, { payload }) => {
        state.loading = "";
        state.apiName = "";
        state.alertType = "error";
        state.message = payload?.message || "Failed to fetch categories";
        state.error = true;
      });
  },
});

export const { clearBuyerCategoryState } = buyerCategorySlice.actions;
export default buyerCategorySlice.reducer;
