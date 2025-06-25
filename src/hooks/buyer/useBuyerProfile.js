import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchBuyerProfileAction,
  updateBuyerProfileAction,
  resetBuyerPasswordAction,
} from '@/store/actions/buyer/buyer-profile.action';

const useBuyerProfile = () => {
  const dispatch = useDispatch();

  const { profile, loading, error } = useSelector((state) => state.buyerProfile || {});

  const fetchProfile = useCallback((id) => {
    return dispatch(fetchBuyerProfileAction(id));
  }, [dispatch]);

  const updateProfile = useCallback((payload) => {
    return dispatch(updateBuyerProfileAction(payload));
  }, [dispatch]);

  const resetPassword = useCallback((payload) => {
    return dispatch(resetBuyerPasswordAction(payload));
  }, [dispatch]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    resetPassword,
  };
};

export default useBuyerProfile;
