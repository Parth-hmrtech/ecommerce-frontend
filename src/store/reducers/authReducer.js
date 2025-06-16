import { createSlice } from '@reduxjs/toolkit';
import { signUpUser, signInUser, forgotPassword } from '../actions/authActions';

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
            //  Sign Up
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
                state.message = action.payload?.message || 'Sign up successful';
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = null;
            })

            //  Sign In
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = null;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
                state.message = action.payload?.message || 'Sign in successful';
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = null;
            })

            //  Forgot Password
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload?.message || 'Reset link sent to your email';
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = null;
            })

    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
