// src/store/actions/sellerProductAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';
import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Fetch All Products
export const fetchAllProducts = createAsyncThunk(
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

// Add Product
export const addProductAction = createAsyncThunk(
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

// Update Product
export const updateProductAction = createAsyncThunk(
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

// Delete Product
export const deleteProductAction = createAsyncThunk(
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
export const uploadProductImageAction = createAsyncThunk(
  'productImages/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');

      const response = await apiRequest({
        method: 'POST',
        url: '/seller/products/image', // ✅ Now relative
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to upload image'
      );
    }
  }
);
