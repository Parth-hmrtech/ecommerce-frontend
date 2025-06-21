import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchAllSubCategories = createAsyncThunk(
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
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch subcategories');
    }
  }
);

const fetchAllSubCategoriesById = createAsyncThunk(
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
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch subcategories');
    }
  }
);

const addSubCategoryAction = createAsyncThunk(
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
      return rejectWithValue(err?.response?.data?.message || 'Failed to add subcategory');
    }
  }
);

const updateSubCategoryAction = createAsyncThunk(
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
      return rejectWithValue(err?.response?.data?.message || 'Failed to update subcategory');
    }
  }
);

const deleteSubCategoryAction = createAsyncThunk(
  'subcategories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest({
        method: 'DELETE',
        url: `/seller/subcategories/${id}`,
        headers: getAuthHeaders(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete subcategory');
    }
  }
);

export {
  fetchAllSubCategories,
  fetchAllSubCategoriesById,
  addSubCategoryAction,
  updateSubCategoryAction,
  deleteSubCategoryAction
};
