import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProductsAction } from '@/store/actions/product.action';
import {
  fetchBuyerCartAction,
  addToBuyerCartAction,
  updateBuyerCartAction,
  deleteBuyerCartAction,
} from '@/store/actions/cart.action';

const useBuyerDashboard = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.product);
  const { cart = [] } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchBuyerCartAction());
  }, [dispatch]);

  const addToCart = (product_id, quantity) => {
    return dispatch(addToBuyerCartAction({ product_id, quantity }));
  };

  const updateCart = (id, quantity) => {
    return dispatch(updateBuyerCartAction({ id, quantity }));
  };

  const deleteFromCart = (id) => {
    return dispatch(deleteBuyerCartAction(id));
  };

  const refreshCart = () => {
    return dispatch(fetchBuyerCartAction());
  };

  return {
    products,
    cart,
    loading,
    error,
    addToCart,
    updateCart,
    deleteFromCart,
    refreshCart,
  };
};

export default useBuyerDashboard;