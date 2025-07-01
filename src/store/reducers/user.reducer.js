import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserProfileAction,
  updateUserProfileAction,
  resetUserPasswordAction,
} from '@/store/actions/user.action';

const initialState = {
  profile: null,         // unified user profile
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const userSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    // 📥 Fetch User Profile
    builder.addCase(fetchUserProfileAction.pending, (state) => {
      state.apiName = 'userProfile/fetch';
      state.loading = 'userProfile/fetch';
    });
    builder.addCase(fetchUserProfileAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.profile = payload;
      state.alertType = 'success';
      state.message = payload?.message || 'Profile loaded';
      state.error = false;
    });
    builder.addCase(fetchUserProfileAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.message = payload || 'Failed to fetch profile';
      state.error = true;
    });

    // 📝 Update User Profile
    builder.addCase(updateUserProfileAction.pending, (state) => {
      state.apiName = 'userProfile/update';
      state.loading = 'userProfile/update';
    });
    builder.addCase(updateUserProfileAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.profile = payload;
      state.alertType = 'success';
      state.message = payload?.message || 'Profile updated';
      state.error = false;
    });
    builder.addCase(updateUserProfileAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.message = payload || 'Failed to update profile';
      state.error = true;
    });

    // 🔐 Reset Password
    builder.addCase(resetUserPasswordAction.pending, (state) => {
      state.apiName = 'userProfile/resetPassword';
      state.loading = 'userProfile/resetPassword';
    });
    builder.addCase(resetUserPasswordAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = payload?.message || 'Password reset successful';
      state.error = false;
    });
    builder.addCase(resetUserPasswordAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      state.message = payload || 'Failed to reset password';
      state.error = true;
    });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
