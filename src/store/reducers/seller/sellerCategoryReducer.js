import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCategoriesAction,
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from '../../actions/seller/sellerCategoryAction';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategoriesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategoriesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCategoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load categories';
      })

      .addCase(addCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add category';
      })

      .addCase(updateCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update category';
      })

      .addCase(deleteCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((cat) => cat.id !== action.payload);
      })
      .addCase(deleteCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete category';
      });
  },
});

export default categorySlice.reducer;
