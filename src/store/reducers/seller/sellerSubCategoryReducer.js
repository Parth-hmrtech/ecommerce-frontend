import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSubCategoriesAction,
  addSubCategoryAction,
  updateSubCategoryAction,
  deleteSubCategoryAction,
  fetchAllSubCategoriesByIdAction,
} from '../../actions/seller/sellerSubCategoryAction';

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
      .addCase(fetchAllSubCategoriesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubCategoriesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllSubCategoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllSubCategoriesByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubCategoriesByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllSubCategoriesByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addSubCategoryAction.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addSubCategoryAction.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateSubCategoryAction.fulfilled, (state, action) => {
        const index = state.list.findIndex(sub => sub.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateSubCategoryAction.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteSubCategoryAction.fulfilled, (state, action) => {
        state.list = state.list.filter(sub => sub.id !== action.payload);
      })
      .addCase(deleteSubCategoryAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default subCategorySlice.reducer;
