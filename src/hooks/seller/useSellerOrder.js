import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSellerOrdersAction,
  updateOrderStatusAction,
} from '@/store/actions/seller/seller-order.action';

import { fetchAllProductsAction } from '@/store/actions/seller/seller-product.action';

const useSellerOrder = () => {
  const dispatch = useDispatch();

  const fetchSellerOrders = () => {
    return dispatch(fetchSellerOrdersAction());
  };

  const fetchSellerProducts = () => {
    return dispatch(fetchAllProductsAction());
  };

  const updateOrderStatus = (orderId, status) => {
    return dispatch(updateOrderStatusAction({ orderId, status }));
  };

  const sellerOrders = useSelector((state) => state.sellerOrders);
  const sellerProduct = useSelector((state) => state.sellerProduct);

  return {
    sellerOrders,
    sellerProduct,
    fetchSellerOrders,
    fetchSellerProducts,
    updateOrderStatus,
  };
};

export default useSellerOrder;
