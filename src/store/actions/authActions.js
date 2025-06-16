import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// Sign Up
export const signUpUser = createAsyncThunk('auth/signUpUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await apiRequest({
      method: 'POST',
      url: 'http://localhost:3008/api/auth/register',
      data: userData,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message || 'Something went wrong');
  }
});

// Sign In
export const signInUser = createAsyncThunk('auth/signInUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiRequest({
      method: 'POST',
      url: 'http://localhost:3008/api/auth/login',
      data: credentials,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message || 'Sign in failed');
  }
});

// Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const response = await apiRequest({
      method: 'POST',
      url: 'http://localhost:3008/api/auth/forgot-password',
      data: { email },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message || 'Password reset failed');
  }
});
