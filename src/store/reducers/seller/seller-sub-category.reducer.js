import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSubCategoriesAction,
  addSubCategoryAction,
  updateSubCategoryAction,
  deleteSubCategoryAction,
  fetchAllSubCategoriesByIdAction,
} from '../../actions/seller/seller-sub-category.action';

const initialState = {
  list: [],
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
};

const subCategorySlice = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {
    clearSubCategoryState: (state) => {
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // 🔄 FETCH ALL
    builder.addCase(fetchAllSubCategoriesAction.pending, (state) => {
      state.apiName = 'subcategory/fetchAll';
      state.loading = 'subcategory/fetchAll';
    });
    builder.addCase(fetchAllSubCategoriesAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Subcategories fetched successfully';
      state.list = payload;
    });
    builder.addCase(fetchAllSubCategoriesAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    // 🔄 FETCH BY CATEGORY ID
    builder.addCase(fetchAllSubCategoriesByIdAction.pending, (state) => {
      state.apiName = 'subcategory/fetchByCategoryId';
      state.loading = 'subcategory/fetchByCategoryId';
    });
    builder.addCase(fetchAllSubCategoriesByIdAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Subcategories fetched by category ID';
      state.list = payload;
    });
    builder.addCase(fetchAllSubCategoriesByIdAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    // ➕ ADD
    builder.addCase(addSubCategoryAction.fulfilled, (state, { payload }) => {
      state.alertType = 'success';
      state.message = 'Subcategory added successfully';
      state.list.push(payload);
    });
    builder.addCase(addSubCategoryAction.rejected, (state, { payload }) => {
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    // ✏️ UPDATE
    builder.addCase(updateSubCategoryAction.fulfilled, (state, { payload }) => {
      state.alertType = 'success';
      state.message = 'Subcategory updated successfully';
      const index = state.list.findIndex((sub) => sub.id === payload.id);
      if (index !== -1) {
        state.list[index] = payload;
      }
    });
    builder.addCase(updateSubCategoryAction.rejected, (state, { payload }) => {
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    // ❌ DELETE
    builder.addCase(deleteSubCategoryAction.fulfilled, (state, { payload }) => {
      state.alertType = 'success';
      state.message = 'Subcategory deleted successfully';
      state.list = state.list.filter((sub) => sub.id !== payload);
    });
    builder.addCase(deleteSubCategoryAction.rejected, (state, { payload }) => {
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export const { clearSubCategoryState } = subCategorySlice.actions;
export default subCategorySlice.reducer;
