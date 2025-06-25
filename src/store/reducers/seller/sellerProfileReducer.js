import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSellerProfileAction,
  updateSellerProfileAction,
  resetSellerPasswordAction,
} from '../../actions/seller/sellerProfileAction';

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
      .addCase(fetchSellerProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSellerProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateSellerProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateSellerProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetSellerPasswordAction.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetSuccess = '';
        state.passwordResetError = '';
      })
      .addCase(resetSellerPasswordAction.fulfilled, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetSuccess = action.payload;
        console.log(action.payload);
        
      })
      .addCase(resetSellerPasswordAction.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
      });
  },
});

export const { clearProfileMessages } = sellerProfileSlice.actions;
export default sellerProfileSlice.reducer;
