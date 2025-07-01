import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  signUpUserAction,
  signInUserAction,
  forgotPasswordAction,
} from '@/store/actions/auth.actions';

import { resetAuthState } from '@/store/reducers/auth.reducer'; 

const useAuthentication = () => {
  const dispatch = useDispatch();

  const { user, loading, error, success, message } = useSelector((state) => state.auth);

  const signUp = (data) => {
    if (!data) return;
    dispatch(signUpUserAction(data));
  };

  const signIn = (data) => {
    if (!data) return;
    dispatch(signInUserAction(data));
  };

  const forgotPassword = (emailData) => {
    if (!emailData) return;
    dispatch(forgotPasswordAction(emailData));
  };

  const resetAuth = () => {
    dispatch(resetAuthState());
  };

  useEffect(() => {
    return () => {
      resetAuth();
    };
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    success,
    message,
    signUp,
    signIn,
    forgotPassword,
    resetAuth,
  };
};

export default useAuthentication;
