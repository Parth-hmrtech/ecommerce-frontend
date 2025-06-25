import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBuyerCartAction,
  updateBuyerCartAction,
  deleteBuyerCartAction,
  deleteBuyerIdCartAction,
} from '@/store/actions/buyer/buyer-cart.action';

import { fetchProductsAction } from '@/store/actions/product.actions';
import { placeBuyerOrderAction } from '@/store/actions/buyer/buyer-order.action';

const useBuyerCart = () => {
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.buyerCart);
  const { products } = useSelector((state) => state.product);

  const fetchCart = () => dispatch(fetchBuyerCartAction());
  const fetchProducts = () => dispatch(fetchProductsAction());

  const updateCartItem = (payload) => dispatch(updateBuyerCartAction(payload));
  const deleteCartItem = (id) => dispatch(deleteBuyerCartAction(id));
  const deleteCartByBuyerId = (buyerId) => dispatch(deleteBuyerIdCartAction(buyerId));

  const placeOrder = (payload) => dispatch(placeBuyerOrderAction(payload));

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, [dispatch]);

  return {
    cart,
    loading,
    error,
    products,
    fetchCart,
    fetchProducts,
    updateCartItem,
    deleteCartItem,
    deleteCartByBuyerId,
    placeOrder,
  };
};

export default useBuyerCart;
