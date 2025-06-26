import { createSlice } from '@reduxjs/toolkit';
import {
  signUpUserAction,
  signInUserAction,
  forgotPasswordAction,
} from '../../actions/auth/auth.actions';

const initialState = {
  user: null,
  loading: '',
  error: false,
  message: '',
  apiName: '',
  alertType: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthMessage: (state) => {
      state.alertType = '';
      state.apiName = '';
      state.message = '';
      state.error = false;
    },
    setAuthError: (state, action) => {
      state.alertType = action.payload.alertType;
      state.apiName = action.payload.apiName;
      state.message = action.payload.message;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.loading = '';
      state.error = false;
      state.message = '';
      state.apiName = '';
      state.alertType = '';
    },
  },
  extraReducers: (builder) => {
    // === Signup ===
    builder.addCase(signUpUserAction.pending, (state) => {
      state.apiName = 'auth/signUp';
      state.loading = 'auth/signUp';
    });
    builder.addCase(signUpUserAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = payload?.message || 'Sign up successful';
      state.user = payload?.data?.user || null;
    });
    builder.addCase(signUpUserAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    // === Sign In ===
    builder.addCase(signInUserAction.pending, (state) => {
      state.apiName = 'auth/signIn';
      state.loading = 'auth/signIn';
    });
    builder.addCase(signInUserAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = payload?.message || 'Sign in successful';
      state.user = payload?.data?.user || null;
      console.log(payload);
      
      localStorage.setItem('user', JSON.stringify(payload?.data?.user));
      localStorage.setItem('access_token', payload?.data?.token);
    });
    builder.addCase(signInUserAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    // === Forgot Password ===
    builder.addCase(forgotPasswordAction.pending, (state) => {
      state.apiName = 'auth/forgotPassword';
      state.loading = 'auth/forgotPassword';
    });
    builder.addCase(forgotPasswordAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = payload?.message || 'Reset link sent to your email';
    });
    builder.addCase(forgotPasswordAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

// ✅ Export all defined actions including the newly added one
export const { clearAuthMessage, setAuthError, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
