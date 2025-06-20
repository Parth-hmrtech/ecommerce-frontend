// src/store/actions/sellerSubCategoryAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// Token Helper
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ✅ Fetch All Subcategories
export const fetchAllSubCategories = createAsyncThunk(
  'subcategories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/subcategories',
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      console.error('Fetch Subcategories Error:', err);
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch subcategories');
    }
  }
);

// ✅ Fetch Subcategories by Category ID
export const fetchAllSubCategoriesById = createAsyncThunk(
  'subcategories/fetchByCategoryId',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/seller/subcategories/${categoryId}`,
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      console.error('Fetch Subcategories by ID Error:', err);
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch subcategories');
    }
  }
);

// ✅ Add Subcategory
export const addSubCategoryAction = createAsyncThunk(
  'subcategories/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/seller/subcategories',
        data,
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      console.error('Add Subcategory Error:', err);
      return rejectWithValue(err?.response?.data?.message || 'Failed to add subcategory');
    }
  }
);

// ✅ Update Subcategory
export const updateSubCategoryAction = createAsyncThunk(
  'subcategories/update',
  async ({ id, sub_category_name }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/seller/subcategories/${id}`,
        data: { sub_category_name },
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (err) {
      console.error('Update Subcategory Error:', err);
      return rejectWithValue(err?.response?.data?.message || 'Failed to update subcategory');
    }
  }
);

// ✅ Delete Subcategory
export const deleteSubCategoryAction = createAsyncThunk(
  'subcategories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest({
        method: 'DELETE',
        url: `/seller/subcategories/${id}`,
        headers: getAuthHeaders(),
      });
      return id; // Return ID for reducer to remove from list
    } catch (err) {
      console.error('Delete Subcategory Error:', err);
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete subcategory');
    }
  }
);
