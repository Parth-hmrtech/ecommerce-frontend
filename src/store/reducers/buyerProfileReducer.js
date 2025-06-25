import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerProfileAction,
  updateBuyerProfileAction,
  resetBuyerPasswordAction,
} from '../actions/buyerProfileAction';

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateSuccess: false,

  passwordResetLoading: false,
  passwordResetSuccess: null, // Now holds full payload (can be object)
  passwordResetError: '',
};

const buyerProfileSlice = createSlice({
  name: 'buyerProfile',
  initialState,
  reducers: {
    clearProfileMessages: (state) => {
      state.error = null;
      state.updateSuccess = false;
      state.passwordResetSuccess = null;
      state.passwordResetError = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Buyer Profile ---
      .addCase(fetchBuyerProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchBuyerProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Update Buyer Profile ---
      .addCase(updateBuyerProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateBuyerProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateBuyerProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Reset Password ---
      .addCase(resetBuyerPasswordAction.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetSuccess = null;
        state.passwordResetError = '';
      })
      .addCase(resetBuyerPasswordAction.fulfilled, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetSuccess = action.payload; // Store full payload object
        console.log('Password reset success payload:', action.payload);
      })
      .addCase(resetBuyerPasswordAction.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
      });
  },
});

export const { clearProfileMessages } = buyerProfileSlice.actions;
export default buyerProfileSlice.reducer;
