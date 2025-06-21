import { createSlice } from '@reduxjs/toolkit';
import {
  signUpUserAction,
  signInUserAction,
  forgotPasswordAction,
} from '../actions/authActions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(signUpUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.message = action.payload?.message || 'Sign up successful';
      })
      .addCase(signUpUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = null;
      })
      .addCase(signInUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(signInUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || 'Sign in successful';
        state.user = action.payload?.data?.user;
        localStorage.setItem('user', JSON.stringify(action.payload?.data?.user));
        localStorage.setItem('access_token', action.payload?.data?.token);
      })
      .addCase(signInUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = null;
      })
      .addCase(forgotPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || 'Reset link sent to your email';
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
