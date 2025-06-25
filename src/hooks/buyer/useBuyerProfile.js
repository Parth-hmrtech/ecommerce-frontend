import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBuyerProfileAction,
  updateBuyerProfileAction,
  resetBuyerPasswordAction,
} from '@/store/actions/buyer/buyer-profile.action';

const useBuyerProfile = () => {
  const dispatch = useDispatch();

  const { profile, loading, error } = useSelector((state) => state.buyerProfile);

  const fetchProfile = (id) => {
    return dispatch(fetchBuyerProfileAction(id));
  };

  const updateProfile = (payload) => {
    return dispatch(updateBuyerProfileAction(payload));
  };

  const resetPassword = (payload) => {
    return dispatch(resetBuyerPasswordAction(payload));
  };

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
