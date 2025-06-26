// src/hooks/buyer/useBuyerWishlist.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchBuyerWishlistAction,
  deleteFromBuyerWishlistAction,
} from '@/store/actions/buyer/buyer-wishlist.action';

import { fetchProductsAction } from '@/store/actions/product.actions';

const useBuyerWishlist = () => {
  const dispatch = useDispatch();

  const {
    items: wishlist = [],
    loading: wishlistLoading,
    error: wishlistError,
  } = useSelector((state) => state.buyerWishlist);

  const {
    products = [],
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.product);

  const fetchWishlist = () => {
    return dispatch(fetchBuyerWishlistAction());
  };

  const fetchProducts = () => {
    return dispatch(fetchProductsAction());
  };

  const deleteFromWishlist = (product_id) => {
    return dispatch(deleteFromBuyerWishlistAction(product_id)).then(() =>
      dispatch(fetchBuyerWishlistAction())
    );
  };

  const uniqueWishlist = Array.from(
    new Map(wishlist.map((item) => [item.product_id, item])).values()
  );

  useEffect(() => {
    fetchWishlist();
    fetchProducts();
  }, [dispatch]);

  return {
    wishlist: uniqueWishlist,
    wishlistLoading,
    wishlistError,
    products,
    productLoading,
    productError,
    fetchWishlist,
    fetchProducts,
    deleteFromWishlist,
  };
};

export default useBuyerWishlist;
