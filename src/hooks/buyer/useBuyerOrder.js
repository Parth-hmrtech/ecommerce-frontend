import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchBuyerOrdersAction,
  deleteBuyerOrderAction,
  updateBuyerOrderAddressAction,
} from '@/store/actions/buyer/buyer-order.action';

import {
  buyerCheckoutPaymentAction,
  buyerVerifyPaymentAction,
  buyerCheckPaymentStatusAction,
} from '@/store/actions/buyer/buyer-payment.action';

import {
  addBuyerReviewAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
  fetchBuyerReviewByProductIdAction,
} from '@/store/actions/buyer/buyer-review.action';

const useBuyerOrder = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.buyerOrder);
  const { buyerCheckPayments } = useSelector((state) => state.buyerPayment);
  const { items: reviewResponses } = useSelector((state) => state.buyerReview);

  const fetchOrders = () => {
    return dispatch(fetchBuyerOrdersAction());
  };

  const deleteOrder = (orderId) => {
    return dispatch(deleteBuyerOrderAction(orderId));
  };

  const updateOrderAddress = ({ orderId, delivery_address }) => {
    return dispatch(updateBuyerOrderAddressAction({ orderId, delivery_address }));
  };

  const fetchPaymentStatus = () => {
    return dispatch(buyerCheckPaymentStatusAction());
  };

  const checkoutPayment = (payload) => {
    return dispatch(buyerCheckoutPaymentAction(payload));
  };

  const verifyPayment = (payload) => {
    return dispatch(buyerVerifyPaymentAction(payload));
  };

  const addReview = (payload) => {
    return dispatch(addBuyerReviewAction(payload));
  };

  const updateReview = (payload) => {
    return dispatch(updateBuyerReviewAction(payload));
  };

  const deleteReview = (reviewId) => {
    return dispatch(deleteBuyerReviewAction(reviewId));
  };

  const fetchReviewsByProductId = (productId) => {
    return dispatch(fetchBuyerReviewByProductIdAction(productId));
  };

  useEffect(() => {
    fetchOrders();
    fetchPaymentStatus();
  }, [dispatch]);

  return {
    orders,
    loading,
    error,
    buyerCheckPayments,
    reviewResponses,
    fetchOrders,
    deleteOrder,
    updateOrderAddress,
    fetchPaymentStatus,
    checkoutPayment,
    verifyPayment,
    addReview,
    updateReview,
    deleteReview,
    fetchReviewsByProductId,
  };
};

export default useBuyerOrder;
