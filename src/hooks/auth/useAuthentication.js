import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  signUpUserAction,
  signInUserAction,
  forgotPasswordAction,
} from '@/store/actions/auth/auth.actions';
import { resetAuthState } from '@/store/reducers/auth/auth.reducer';

const useAuthentication = () => {
  const dispatch = useDispatch();

  const { user, loading, error, success, message } = useSelector((state) => state.auth);

  const signUp = (data) => {
    dispatch(signUpUserAction(data));
  };

  const signIn = (data) => {
    dispatch(signInUserAction(data));
  };

  const forgotPassword = (data) => {
    dispatch(forgotPasswordAction(data));
  };

  const resetAuth = () => {
    dispatch(resetAuthState());
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);
    

  return {
    user,
    loading,
    error,
    message,
    success,
    signUp,
    signIn,
    forgotPassword,
    resetAuth,
  };
};

export default useAuthentication;
