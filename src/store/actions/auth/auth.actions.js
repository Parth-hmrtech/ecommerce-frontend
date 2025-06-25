import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../hooks/useApiRequest';

const signUpUserAction = createAsyncThunk(
  'auth/signUpUser',
  async (userData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/auth/register',
        data: userData,
      });

      if (response?.status !== 200) {
        return rejectWithValue(new Error("Something is wrong here"));
      }

      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(
        new Error(error?.data?.message || "Something is wrong here")
      );
    }
  }
);

const signInUserAction = createAsyncThunk(
  'auth/signInUser',
  async (credentials, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/auth/login',
        data: credentials,
      });

      if (response?.status !== 200) {
        return rejectWithValue(new Error("Something is wrong here"));
      }

      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(
        new Error(error?.data?.message || "Something is wrong here")
      );
    }
  }
);

const forgotPasswordAction = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, role }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/auth/forgot-password',
        data: { email, role },
      });

      if (response?.status !== 200) {
        return rejectWithValue(new Error("Something is wrong here"));
      }

      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(
        new Error(error?.data?.message || "Something is wrong here")
      );
    }
  }
);

export { signUpUserAction, signInUserAction, forgotPasswordAction };
