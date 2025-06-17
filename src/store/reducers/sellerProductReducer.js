import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllProducts,
  addProductAction,
  updateProductAction,
  deleteProductAction,
    uploadProductImageAction,
} from '../actions/sellerProductAction';


const initialState = {
  list: [],
  loading: false,
  error: null,
  imageUploadSuccess: false,
  imageDeleteSuccess: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
      state.imageUploadSuccess = false;
      state.imageDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Product
      .addCase(addProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload Image
      .addCase(uploadProductImageAction.pending, (state) => {
        state.loading = true;
        state.imageUploadSuccess = false;
        state.error = null;
      })
      .addCase(uploadProductImageAction.fulfilled, (state) => {
        state.loading = false;
        state.imageUploadSuccess = true;
      })
      .addCase(uploadProductImageAction.rejected, (state, action) => {
        state.loading = false;
        state.imageUploadSuccess = false;
        state.error = action.payload;
      })


  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
