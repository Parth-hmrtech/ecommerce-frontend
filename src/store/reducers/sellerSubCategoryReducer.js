// src/store/reducers/sellerSubCategorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSubCategories,
  addSubCategoryAction,
  updateSubCategoryAction,
  deleteSubCategoryAction,
  fetchAllSubCategoriesById,
} from '../actions/sellerSubCategoryAction';

const subCategorySlice = createSlice({
  name: 'subcategories',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by Category ID
      .addCase(fetchAllSubCategoriesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubCategoriesById.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllSubCategoriesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addSubCategoryAction.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addSubCategoryAction.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(updateSubCategoryAction.fulfilled, (state, action) => {
        const index = state.list.findIndex(sub => sub.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateSubCategoryAction.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteSubCategoryAction.fulfilled, (state, action) => {
        state.list = state.list.filter(sub => sub.id !== action.payload);
      })
      .addCase(deleteSubCategoryAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default subCategorySlice.reducer;
