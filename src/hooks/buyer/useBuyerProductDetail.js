// src/hooks/buyer/useBuyerProductDetail.js

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchBuyerCartAction,
  addToBuyerCartAction,
  updateBuyerCartAction,
  deleteBuyerCartAction,
} from '@/store/actions/buyer/buyer-cart.action';

import { fetchBuyerProductByIdAction } from '@/store/actions/buyer/buyer-product.action';

import {
  fetchBuyerWishlistAction,
  addToBuyerWishlistAction,
} from '@/store/actions/buyer/buyer-wishlist.action';

import {
  fetchBuyerReviewByProductIdAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
} from '@/store/actions/buyer/buyer-review.action';

const useBuyerProductDetail = (productId) => {
  const dispatch = useDispatch();

  // Selectors
  const { product, loading, error } = useSelector((state) => state.buyerProduct);
  const { cart = [] } = useSelector((state) => state.buyerCart);
  const { items: wishlist = [] } = useSelector((state) => state.buyerWishlist);
  const { items: reviewResponses = [] } = useSelector((state) => state.buyerReview);

  // Dispatchers
  const fetchProduct = () => dispatch(fetchBuyerProductByIdAction(productId));
  const fetchCart = () => dispatch(fetchBuyerCartAction());
  const fetchWishlist = () => dispatch(fetchBuyerWishlistAction());
  const fetchReviews = (id) => dispatch(fetchBuyerReviewByProductIdAction(id));

  const addToCart = (payload) => dispatch(addToBuyerCartAction(payload));
  const updateCart = (payload) => dispatch(updateBuyerCartAction(payload));
  const deleteCartItem = (cartItemId) => dispatch(deleteBuyerCartAction(cartItemId));

  const addToWishlist = (payload) => dispatch(addToBuyerWishlistAction(payload));

  const updateReview = (payload) => dispatch(updateBuyerReviewAction(payload));
  const deleteReview = (reviewId) => dispatch(deleteBuyerReviewAction(reviewId));

  // Initial fetches on mount or when productId changes
  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchCart();
      fetchWishlist();
    }
  }, [productId]);

  // Fetch reviews when product is loaded
  useEffect(() => {
    if (product?.id) {
      fetchReviews(product.id);
    }
  }, [product?.id]);

  return {
    product,
    loading,
    error,
    cart,
    wishlist,
    reviewResponses,
    fetchCart,
    fetchWishlist,
    fetchProduct,
    fetchReviews,
    addToCart,
    updateCart,
    deleteCartItem,
    addToWishlist,
    updateReview,
    deleteReview,
  };
};

export default useBuyerProductDetail;
