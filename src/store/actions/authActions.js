import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const signUpUserAction = createAsyncThunk(
  'auth/signUpUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/auth/register',
        data: userData,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Something went wrong');
    }
  }
);

const signInUserAction = createAsyncThunk(
  'auth/signInUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/auth/login',
        data: credentials,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Sign in failed');
    }
  }
);

const forgotPasswordAction = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, role }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/auth/forgot-password',
        data: { email, role }, // send both email and role
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err.message || 'Password reset failed'
      );
    }
  }
);
export { signUpUserAction, signInUserAction, forgotPasswordAction };
