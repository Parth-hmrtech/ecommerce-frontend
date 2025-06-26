import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchBuyerWishlistAction = createAsyncThunk(
  'buyerWishlist/fetchBuyerWishlist',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/buyer/wishlist',
        headers: getTokenHeader(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const addToBuyerWishlistAction = createAsyncThunk(
  'buyerWishlist/addToBuyerWishlist',
  async ({ buyer_id, product_id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/buyer/wishlist',
        data: { buyer_id, product_id },
        headers: getTokenHeader(),
      });
      return fulfillWithValue(response.data?.data || []);
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

const deleteFromBuyerWishlistAction = createAsyncThunk(
  'buyerWishlist/deleteFromBuyerWishlist',
  async (wishlistId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/buyer/wishlist/${wishlistId}`,
        headers: getTokenHeader(),
      });
      return fulfillWithValue({
        wishlistId,
        message: response?.data?.message || 'Deleted from wishlist',
      });
    } catch (error) {
      return rejectWithValue('Something is wrong here');
    }
  }
);

export {
  fetchBuyerWishlistAction,
  addToBuyerWishlistAction,
  deleteFromBuyerWishlistAction,
};
