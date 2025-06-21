import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/products',
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch products');
    }
  }
);

const addProductAction = createAsyncThunk(
  'products/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/seller/products',
        data,
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to add product');
    }
  }
);

const updateProductAction = createAsyncThunk(
  'products/update',
  async ({ id, ...productData }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/seller/products/${id}`,
        data: productData,
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to update product');
    }
  }
);

const deleteProductAction = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest({
        method: 'DELETE',
        url: `/seller/products/${id}`,
        headers: getAuthHeaders(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete product');
    }
  }
);

const uploadProductImageAction = createAsyncThunk(
  'productImages/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');

      const response = await apiRequest({
        method: 'POST',
        url: '/seller/products/image',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
    }
  }
);

export {
  fetchAllProducts,
  addProductAction,
  updateProductAction,
  deleteProductAction,
  uploadProductImageAction,
};
