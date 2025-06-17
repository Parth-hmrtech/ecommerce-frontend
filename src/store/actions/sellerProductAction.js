// src/store/actions/sellerProductAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';
import axios from 'axios';
// Helper to get token
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
        url: 'http://localhost:3008/api/seller/products',
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      console.error('Fetch Products Error:', err);
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
        url: 'http://localhost:3008/api/seller/products',
        data,
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      console.error('Add Product Error:', err);
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
        url: `http://localhost:3008/api/seller/products/${id}`,
        data: productData,
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      console.error('Update Product Error:', err);
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
        url: `http://localhost:3008/api/seller/products/${id}`,
        headers: getAuthHeaders(),
      });
      return id;
    } catch (err) {
      console.error('Delete Product Error:', err);
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete product');
    }
  }
);
export const uploadProductImageAction = createAsyncThunk(
  'productImages/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3008/api/seller/products/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(), // ✅ spread the object here
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to upload image'
      );
    }
  }
);
