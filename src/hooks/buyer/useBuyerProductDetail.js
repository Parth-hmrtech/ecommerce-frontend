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

  const { product, loading, error } = useSelector((state) => state.buyerProduct);
  const { cart = [] } = useSelector((state) => state.buyerCart);
  const { items: wishlist = [] } = useSelector((state) => state.buyerWishlist);
  const { items: reviewResponses = [] } = useSelector((state) => state.buyerReview);

  const fetchProduct = () => {
    return dispatch(fetchBuyerProductByIdAction(productId));
  };

  const fetchCart = () => {
    return dispatch(fetchBuyerCartAction());
  };

  const fetchWishlist = () => {
    return dispatch(fetchBuyerWishlistAction());
  };

  const fetchReviews = (id) => {
    return dispatch(fetchBuyerReviewByProductIdAction(id));
  };

  const addToCart = (payload) => {
    return dispatch(addToBuyerCartAction(payload));
  };

  const updateCart = (payload) => {
    return dispatch(updateBuyerCartAction(payload));
  };

  const deleteCartItem = (cartItemId) => {
    return dispatch(deleteBuyerCartAction(cartItemId));
  };

  const addToWishlist = (payload) => {
    return dispatch(addToBuyerWishlistAction(payload));
  };

  const updateReview = (payload) => {
    return dispatch(updateBuyerReviewAction(payload));
  };

  const deleteReview = (reviewId) => {
    return dispatch(deleteBuyerReviewAction(reviewId));
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchCart();
      fetchWishlist();
    }
  }, [productId]);

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
