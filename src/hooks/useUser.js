import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import {
  fetchUserProfileAction,
  updateUserProfileAction,
  resetUserPasswordAction,
} from '@/store/actions/user.action';

const useUserProfile = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  const {
    profile,
    loading,
    apiName,
    alertType,
    message,
    error,
  } = useSelector((state) => state.user || {});

  const fetchUserProfile = useCallback(() => {
    return dispatch(fetchUserProfileAction());
  }, [dispatch]);

  const updateUserProfile = useCallback(
    ({ id = userId, data }) => {
      return dispatch(updateUserProfileAction({ id, data }));
    },
    [dispatch, userId]
  );

  const resetUserPassword = useCallback(
    (payload) => {
      return dispatch(resetUserPasswordAction(payload));
    },
    [dispatch]
  );

  return {
    profile,
    fetchUserProfile,
    updateUserProfile,
    resetUserPassword,
    loading,
    apiName,
    alertType,
    message,
    error,
  };
};

export default useUserProfile;
