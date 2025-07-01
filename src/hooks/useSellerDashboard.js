import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSellerReviewsAction } from '@/store/actions/review.action';
import { fetchAllProductsAction } from '@/store/actions/product.action';
import {
  fetchSellerPaymentsAction,
  fetchSellerEarningsAction,
} from '@/store/actions/payment.action';
import { fetchSellerOrdersAction } from '@/store/actions/order.action';

const useSellerDashboard = () => {
  const dispatch = useDispatch();

  const reviewState = useSelector((state) => state.review);
  const productState = useSelector((state) => state.product);
  const paymentState = useSelector((state) => state.payment);
  const orderState = useSelector((state) => state.order);

  const reviews = reviewState?.sellerReviews || [];
  const reviewLoading = reviewState?.loading;

  const products = productState?.products || [];
  const productLoading = productState?.loading;

  const payments = paymentState?.sellerPayments || [];
  const earnings = paymentState?.sellerEarnings || {};
  const paymentLoading = paymentState?.loading;

  const orders = orderState?.sellerOrders || [];
  const orderLoading = orderState?.loading;

  const sellerProductIds = products.map((p) => p._id || p.id);

  const filteredReviews = reviews.filter((review) =>
    sellerProductIds.includes(review.product_id)
  );

  const totalReviews = filteredReviews.length;
  const totalRating = filteredReviews.reduce((sum, review) => sum + parseFloat(review.rating || 0), 0);
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';

  const totalProducts = products.length;

  const filteredOrders = orders.filter((order) =>
    order.order_items?.some((item) => sellerProductIds.includes(item.product_id))
  );

const totalOrders = filteredOrders.length + 1;
  const totalEarnings = earnings?.total_earnings || 0;

  const isLoading = reviewLoading || productLoading || paymentLoading || orderLoading;

  const refreshDashboard = () => {
    dispatch(fetchSellerReviewsAction());
    dispatch(fetchAllProductsAction());
    dispatch(fetchSellerPaymentsAction());
    dispatch(fetchSellerEarningsAction());
    dispatch(fetchSellerOrdersAction());
  }

  useEffect(() => {
    refreshDashboard();
  }, [dispatch]);

  return {
    isLoading,
    totalProducts,
    totalOrders,
    totalEarnings,
    totalReviews,
    averageRating,
    refreshDashboard,
  };
};

export default useSellerDashboard;