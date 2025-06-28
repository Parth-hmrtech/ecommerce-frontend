import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/hooks/useApiRequest';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchAllSubCategoriesAction = createAsyncThunk(
  'subcategories/fetchAll',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/seller/subcategories',
        headers: getAuthHeaders(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const fetchAllSubCategoriesByIdAction = createAsyncThunk(
  'subcategories/fetchByCategoryId',
  async (categoryId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/seller/subcategories/${categoryId}`,
        headers: getAuthHeaders(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const addSubCategoryAction = createAsyncThunk(
  'subcategories/add',
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/seller/subcategories',
        data,
        headers: getAuthHeaders(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const updateSubCategoryAction = createAsyncThunk(
  'subcategories/update',
  async ({ id, sub_category_name }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/seller/subcategories/${id}`,
        data: { sub_category_name },
        headers: getAuthHeaders(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const deleteSubCategoryAction = createAsyncThunk(
  'subcategories/delete',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      await apiRequest({
        method: 'DELETE',
        url: `/seller/subcategories/${id}`,
        headers: getAuthHeaders(),
      });
      return fulfillWithValue(id);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

export {
  fetchAllSubCategoriesAction,
  fetchAllSubCategoriesByIdAction,
  addSubCategoryAction,
  updateSubCategoryAction,
  deleteSubCategoryAction,
};
