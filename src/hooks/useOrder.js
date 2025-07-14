import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';

import {
  fetchBuyerOrdersAction,
  deleteBuyerOrderAction,
  updateBuyerOrderAddressAction,
  fetchSellerOrdersAction,
  updateOrderStatusAction,
} from '@/store/actions/order.action';

import {
  buyerCheckoutPaymentAction,
  buyerVerifyPaymentAction,
  buyerCheckPaymentStatusAction,
} from '@/store/actions/payment.action';

import {
  addBuyerReviewAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
  fetchBuyerReviewByProductIdAction,
} from '@/store/actions/review.action';

import { fetchProductsAction } from '@/store/actions/product.action';

const useOrderManager = (role = 'buyer') => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order || {});
  const payment = useSelector((state) => state.payment || {});
  const review = useSelector((state) => state.review || {});
  const product = useSelector((state) => state.product || {});

  const products = product.products || [];
  const buyerReviews = review.buyerReviews || [];
  const buyerCheckPayments = payment.buyerPayment; 

  const fetchBuyerOrders = useCallback(() => {
    dispatch(fetchBuyerOrdersAction());
  }, [dispatch]);

  const deleteBuyerOrder = useCallback((orderId) => {
    dispatch(deleteBuyerOrderAction(orderId));
  }, [dispatch]);

  const updateBuyerOrderAddress = useCallback(({ orderId, delivery_address }) => {
    dispatch(updateBuyerOrderAddressAction({ orderId, delivery_address }));
  }, [dispatch]);

  const fetchPaymentStatus = useCallback(() => {
    dispatch(buyerCheckPaymentStatusAction());
  }, [dispatch]);

  const checkoutPayment = useCallback((payload) => {
    dispatch(buyerCheckoutPaymentAction(payload));
  }, [dispatch]);

  const verifyPayment = useCallback((payload) => {
    dispatch(buyerVerifyPaymentAction(payload));
  }, [dispatch]);

  const addReview = useCallback((payload) => {
    dispatch(addBuyerReviewAction(payload));
  }, [dispatch]);

  const updateReview = useCallback((payload) => {
    dispatch(updateBuyerReviewAction(payload));
  }, [dispatch]);

  const deleteReview = useCallback((reviewId) => {
    dispatch(deleteBuyerReviewAction(reviewId));
  }, [dispatch]);

  const fetchReviewsByProductId = useCallback((productId) => {
    if (productId) {
      dispatch(fetchBuyerReviewByProductIdAction(productId));
    }
  }, [dispatch]);

  const fetchSellerOrders = useCallback(() => {
    dispatch(fetchSellerOrdersAction());
  }, [dispatch]);

  const fetchSellerProducts = useCallback(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const updateOrderStatus = useCallback((orderId, status) => {
    dispatch(updateOrderStatusAction({ orderId, status }));
  }, [dispatch]);

useEffect(() => {
  console.log("useEffect running because of role or fetch functions", role);

  if (role === 'buyer') {
    fetchBuyerOrders();
    fetchPaymentStatus();
    fetchSellerProducts();
    console.log("From buyer");
  } else if (role === 'seller') {
    fetchSellerOrders();
    fetchSellerProducts();
  }
}, [role, fetchBuyerOrders, fetchPaymentStatus, fetchSellerOrders, fetchSellerProducts]);

  return {
    role,

    products,
    orders: order.buyerOrders || [],
    loading: order.loading || false,
    error: order.error || null,
    buyerCheckPayments,
    buyerReviews,

    fetchOrders: fetchBuyerOrders,
    deleteOrder: deleteBuyerOrder,
    updateOrderAddress: updateBuyerOrderAddress,
    fetchPaymentStatus,
    checkoutPayment,
    verifyPayment,
    addReview,
    updateReview,
    deleteReview,
    fetchReviewsByProductId,

    sellerOrders: order.sellerOrders || [],
    sellerProducts: product.products || [],
    fetchSellerOrders,
    fetchSellerProducts,
    updateOrderStatus,
  };
};

export default useOrderManager;
