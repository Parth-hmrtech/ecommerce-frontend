// src/store/actions/sellerCategoryAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'GET',
        url: `http://localhost:3008/api/seller/categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const addCategoryAction = createAsyncThunk(
  'categories/add',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'POST',
        url: `http://localhost:3008/api/seller/categories`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to add category');
    }
  }
);

export const updateCategoryAction = createAsyncThunk(
  'categories/update',
  async ({ id, category_name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'PUT',
        url: `http://localhost:3008/api/seller/categories/${id}`,
        data: { category_name },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to update category');
    }
  }
);

export const deleteCategoryAction = createAsyncThunk(
  'categories/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await apiRequest({
        method: 'DELETE',
        url: `http://localhost:3008/api/seller/categories/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (err) {
      // 👇 logs actual error from backend if available
      const errorMsg = err?.response?.data?.message || err.message || 'Failed to delete category';
      return rejectWithValue(errorMsg);
    }
  }
);
