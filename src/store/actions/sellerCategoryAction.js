import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchAllCategoriesAction = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/categories',
        headers: getTokenHeader(),
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

const addCategoryAction = createAsyncThunk(
  'categories/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/seller/categories',
        data,
        headers: getTokenHeader(),
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to add category');
    }
  }
);

const updateCategoryAction = createAsyncThunk(
  'categories/update',
  async ({ id, category_name }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/seller/categories/${id}`,
        data: { category_name },
        headers: getTokenHeader(),
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to update category');
    }
  }
);

const deleteCategoryAction = createAsyncThunk(
  'categories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest({
        method: 'DELETE',
        url: `/seller/categories/${id}`,
        headers: getTokenHeader(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Failed to delete category');
    }
  }
);

export {
  fetchAllCategoriesAction,
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction
};
