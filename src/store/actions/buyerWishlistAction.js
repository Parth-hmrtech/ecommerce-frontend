import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const fetchBuyerWishlist = createAsyncThunk(
  'buyerWishlist/fetchBuyerWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/buyer/wishlist',
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to fetch wishlist'
      );
    }
  }
);

const addToBuyerWishlist = createAsyncThunk(
  'buyerWishlist/addToBuyerWishlist',
  async ({ buyer_id, product_id }, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/buyer/wishlist',
        data: { buyer_id, product_id },
        headers: getTokenHeader(),
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to add to wishlist'
      );
    }
  }
);

const deleteFromBuyerWishlist = createAsyncThunk(
  'buyerWishlist/deleteFromBuyerWishlist',
  async (wishlistId, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/buyer/wishlist/${wishlistId}`,
        headers: getTokenHeader(),
      });
      return {
        wishlistId,
        message: response?.data?.message || 'Deleted from wishlist',
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to delete from wishlist'
      );
    }
  }
);

export {
  fetchBuyerWishlist,
  addToBuyerWishlist,
  deleteFromBuyerWishlist
};
