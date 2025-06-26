import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBuyerProfileAction,
  updateBuyerProfileAction,
  resetBuyerPasswordAction,
} from '../../actions/buyer/buyer-profile.action';

const initialState = {
  profile: null,
  loading: '',
  apiName: '',
  alertType: '',
  message: '',
  error: false,
};

const buyerProfileSlice = createSlice({
  name: 'buyerProfile',
  initialState,
  reducers: {
    clearProfileMessages: (state) => {
      state.loading = '';
      state.apiName = '';
      state.alertType = '';
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(fetchBuyerProfileAction.pending, (state) => {
      state.apiName = 'buyerProfile/fetch';
      state.loading = 'buyerProfile/fetch';
    });
    builder.addCase(fetchBuyerProfileAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Profile loaded successfully';
      state.profile = payload;
    });
    builder.addCase(fetchBuyerProfileAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    builder.addCase(updateBuyerProfileAction.pending, (state) => {
      state.apiName = 'buyerProfile/update';
      state.loading = 'buyerProfile/update';
    });
    builder.addCase(updateBuyerProfileAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = 'Profile updated successfully';
      state.profile = payload;
    });
    builder.addCase(updateBuyerProfileAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });

    builder.addCase(resetBuyerPasswordAction.pending, (state) => {
      state.apiName = 'buyerProfile/resetPassword';
      state.loading = 'buyerProfile/resetPassword';
    });
    builder.addCase(resetBuyerPasswordAction.fulfilled, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'success';
      state.message = payload?.message || 'Password updated';
    });
    builder.addCase(resetBuyerPasswordAction.rejected, (state, { payload }) => {
      state.loading = '';
      state.alertType = 'error';
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export const { clearProfileMessages } = buyerProfileSlice.actions;
export default buyerProfileSlice.reducer;
