import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSellerProfileAction,
  updateSellerProfileAction,
  resetSellerPasswordAction,
} from '@/store/actions/seller/seller-profile.action';

const initialState = {
  profile: null,
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
  updateSuccess: false,
  passwordResetLoading: false,
  passwordResetSuccess: '',
  passwordResetError: '',
};

const sellerProfileSlice = createSlice({
  name: 'sellerProfile',
  initialState,
  reducers: {
    clearSellerProfileState: (state) => {
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
      state.updateSuccess = false;
      state.passwordResetSuccess = '';
      state.passwordResetError = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSellerProfileAction.pending, (state) => {
      state.apiName = 'seller/fetchProfile';
      state.loading = 'seller/fetchProfile';
    });
    builder.addCase(fetchSellerProfileAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Profile fetched successfully';
      state.profile = payload;
    });
    builder.addCase(fetchSellerProfileAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    builder.addCase(updateSellerProfileAction.pending, (state) => {
      state.apiName = 'seller/updateProfile';
      state.loading = 'seller/updateProfile';
      state.updateSuccess = false;
    });
    builder.addCase(updateSellerProfileAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Profile updated successfully';
      state.profile = payload;
      state.updateSuccess = true;
    });
    builder.addCase(updateSellerProfileAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    builder.addCase(resetSellerPasswordAction.pending, (state) => {
      state.apiName = 'seller/resetPassword';
      state.passwordResetLoading = true;
      state.passwordResetSuccess = '';
      state.passwordResetError = '';
    });
    builder.addCase(resetSellerPasswordAction.fulfilled, (state, { payload }) => {
      state.passwordResetLoading = false;
      state.alertType = 'success';
      state.message = payload?.message || 'Password updated';
      state.passwordResetSuccess = payload;
    });
    builder.addCase(resetSellerPasswordAction.rejected, (state, { payload }) => {
      state.passwordResetLoading = false;
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
      state.passwordResetError = payload;
    });
  },
});

export const { clearSellerProfileState } = sellerProfileSlice.actions;
export default sellerProfileSlice.reducer;
