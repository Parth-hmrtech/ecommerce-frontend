// src/store/actions/buyerWishlistAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/useApiRequest';

// Utility: Get token
const getTokenHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// 1. Fetch Wishlist
export const fetchBuyerWishlist = createAsyncThunk(
  'buyerWishlist/fetchBuyerWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: 'http://localhost:3008/api/buyer/wishlist',
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

// 2. Add to Wishlist
export const addToBuyerWishlist = createAsyncThunk(
  'buyerWishlist/addToBuyerWishlist',
  async ({ buyer_id, product_id }, { rejectWithValue }) => {
    console.log(buyer_id);
    console.log(product_id);
    
    
    try {
      const response = await apiRequest({
        method: 'POST',
        url: 'http://localhost:3008/api/buyer/wishlist',
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

// 3. Delete from Wishlist
export const deleteFromBuyerWishlist = createAsyncThunk(
  'buyerWishlist/deleteFromBuyerWishlist',
  async (wishlistId, { rejectWithValue }) => {
    
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `http://localhost:3008/api/buyer/wishlist/${wishlistId}`,
        headers: getTokenHeader(),
      });
console.log(response);

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

