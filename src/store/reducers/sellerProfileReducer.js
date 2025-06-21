import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSellerProfile,
  updateSellerProfile,
  resetSellerPassword,
} from '../actions/sellerProfileAction';

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateSuccess: false,
  passwordResetLoading: false,
  passwordResetSuccess: '',
  passwordResetError: '',
};

const sellerProfileSlice = createSlice({
  name: 'sellerProfile',
  initialState,
  reducers: {
    clearProfileMessages: (state) => {
      state.error = null;
      state.updateSuccess = false;
      state.passwordResetSuccess = '';
      state.passwordResetError = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetSellerPassword.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetSuccess = '';
        state.passwordResetError = '';
      })
      .addCase(resetSellerPassword.fulfilled, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetSuccess = action.payload;
      })
      .addCase(resetSellerPassword.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
      });
  },
});

export const { clearProfileMessages } = sellerProfileSlice.actions;
export default sellerProfileSlice.reducer;
