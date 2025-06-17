// src/store/reducers/sellerCategoryReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCategories,
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from '../actions/sellerCategoryAction';

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

      // ✅ Fetch All Categories
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load categories';
      })

      // ✅ Add Category
      .addCase(addCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add new category to the list
      })
      .addCase(addCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add category';
      })

      // ✅ Update Category
      .addCase(updateCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload; // Replace updated category
        }
      })
      .addCase(updateCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update category';
      })

      // ✅ Delete Category
      .addCase(deleteCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((cat) => cat.id !== action.payload); // Remove category by ID
      })
      .addCase(deleteCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete category';
      });
  },
});

export default categorySlice.reducer;
