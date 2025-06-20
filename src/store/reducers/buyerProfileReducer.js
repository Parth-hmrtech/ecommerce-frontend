// src/store/reducers/buyerProfileReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerProfile,
  updateBuyerProfile,
  resetBuyerPassword,
} from '../actions/buyerProfileAction';

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateSuccess: false,
  passwordResetLoading: false,
  passwordResetSuccess: '',
  passwordResetError: '',
};

const buyerProfileSlice = createSlice({
  name: 'buyerProfile',
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
      .addCase(fetchBuyerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchBuyerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateBuyerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateBuyerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateBuyerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetBuyerPassword.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetSuccess = '';
        state.passwordResetError = '';
      })
      .addCase(resetBuyerPassword.fulfilled, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetSuccess = action.payload;
      })
      .addCase(resetBuyerPassword.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
      });
  },
});

export const { clearProfileMessages } = buyerProfileSlice.actions;
export default buyerProfileSlice.reducer;
