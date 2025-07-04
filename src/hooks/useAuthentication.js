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

  const signUp = async (data) => {
    if (!data) return;
    return await dispatch(signUpUserAction(data));
  };

  const signIn = async (data) => {
    if (!data) return;
    return await dispatch(signInUserAction(data));
  };

  const forgotPassword = async (emailData) => {
    if (!emailData) return;
    return await dispatch(forgotPasswordAction(emailData));
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
