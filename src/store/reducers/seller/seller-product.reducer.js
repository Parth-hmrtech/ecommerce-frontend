import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllProductsAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
  uploadProductImageAction,
} from '../../actions/seller/seller-product.action';

const initialState = {
  list: [],
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
  imageUploadSuccess: false,
  imageDeleteSuccess: false, 
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.list = [];
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
      state.imageUploadSuccess = false;
      state.imageDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // === Fetch Products ===
    builder.addCase(fetchAllProductsAction.pending, (state) => {
      state.apiName = 'seller/fetchProducts';
      state.loading = 'seller/fetchProducts';
      state.error = false;
    });
    builder.addCase(fetchAllProductsAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Products fetched successfully';
      state.list = payload || [];
    });
    builder.addCase(fetchAllProductsAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.error = true;
      if (payload) state.message = payload.message;
    });

    // === Add Product ===
    builder.addCase(addProductAction.pending, (state) => {
      state.apiName = 'seller/addProduct';
      state.loading = 'seller/addProduct';
      state.error = false;
    });
    builder.addCase(addProductAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Product added successfully';
      state.list.push(payload);
    });
    builder.addCase(addProductAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.error = true;
      if (payload) state.message = payload.message;
    });

    // === Update Product ===
    builder.addCase(updateProductAction.pending, (state) => {
      state.apiName = 'seller/updateProduct';
      state.loading = 'seller/updateProduct';
      state.error = false;
    });
    builder.addCase(updateProductAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Product updated successfully';
      const index = state.list.findIndex((p) => p.id === payload.id);
      if (index !== -1) {
        state.list[index] = payload;
      }
    });
    builder.addCase(updateProductAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.error = true;
      if (payload) state.message = payload.message ;
    });

    // === Delete Product ===
    builder.addCase(deleteProductAction.pending, (state) => {
      state.apiName = 'seller/deleteProduct';
      state.loading = 'seller/deleteProduct';
      state.error = false;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Product deleted successfully';
      state.list = state.list.filter((p) => p.id !== payload);
    });
    builder.addCase(deleteProductAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.error = true;
      if (payload) state.message = payload.message ;
    });

    // === Upload Product Image ===
    builder.addCase(uploadProductImageAction.pending, (state) => {
      state.apiName = 'seller/uploadProductImage';
      state.loading = 'seller/uploadProductImage';
      state.error = false;
      state.imageUploadSuccess = false;
    });
    builder.addCase(uploadProductImageAction.fulfilled, (state) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Product image uploaded successfully';
      state.imageUploadSuccess = true;
    });
    builder.addCase(uploadProductImageAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.imageUploadSuccess = false;
      state.error = true;
      if (payload) state.message = payload.message;
    });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
