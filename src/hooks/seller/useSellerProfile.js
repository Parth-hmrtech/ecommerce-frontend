import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSellerProfileAction,
  updateSellerProfileAction,
  resetSellerPasswordAction,
} from '@/store/actions/seller/seller-profile.action';

const useSellerProfile = () => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem('user'))?.id;

  const { profile, loading } = useSelector((state) => state.sellerProfile);

  const fetchSellerProfile = (id) => {
    return dispatch(fetchSellerProfileAction(id));
  };

  const updateSellerProfile = (data) => {
    return dispatch(updateSellerProfileAction({ id, data }));
  };

  const resetSellerPassword = (payload) => {
    return dispatch(resetSellerPasswordAction(payload));
  };

  // useEffect(() => {
  //   if (id) fetchSellerProfile();
  // }, [id]);

  return {
    profile,
    loading,
    fetchSellerProfile,
    updateSellerProfile,
    resetSellerPassword,
  };
};

export default useSellerProfile;
