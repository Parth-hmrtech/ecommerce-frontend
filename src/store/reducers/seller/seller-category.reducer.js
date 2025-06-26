import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCategoriesAction,
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from '../../actions/seller/seller-category.action';

const initialState = {
  list: [],
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const sellerCategorySlice = createSlice({
  name: 'sellerCategories',
  initialState,
  reducers: {
    clearSellerCategoryState: (state) => {
      state.list = [];
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(fetchAllCategoriesAction.pending, (state) => {
      state.apiName = 'seller/fetchCategories';
      state.loading = 'seller/fetchCategories';
    });
    builder.addCase(fetchAllCategoriesAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Categories fetched successfully';
      state.list = payload || [];
    });
    builder.addCase(fetchAllCategoriesAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message ;
      }
    });

    
    builder.addCase(addCategoryAction.pending, (state) => {
      state.apiName = 'seller/addCategory';
      state.loading = 'seller/addCategory';
    });
    builder.addCase(addCategoryAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Category added successfully';
      state.list.push(payload);
    });
    builder.addCase(addCategoryAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    builder.addCase(updateCategoryAction.pending, (state) => {
      state.apiName = 'seller/updateCategory';
      state.loading = 'seller/updateCategory';
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Category updated successfully';
      const index = state.list.findIndex((cat) => cat.id === payload.id);
      if (index !== -1) {
        state.list[index] = payload;
      }
    });
    builder.addCase(updateCategoryAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    builder.addCase(deleteCategoryAction.pending, (state) => {
      state.apiName = 'seller/deleteCategory';
      state.loading = 'seller/deleteCategory';
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Category deleted successfully';
      state.list = state.list.filter((cat) => cat.id !== payload);
    });
    builder.addCase(deleteCategoryAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export const { clearSellerCategoryState } = sellerCategorySlice.actions;
export default sellerCategorySlice.reducer;
