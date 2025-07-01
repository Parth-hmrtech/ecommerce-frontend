import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchBuyerProductByIdAction,
  fetchBuyerWishlistAction,
  addToBuyerWishlistAction,
} from '@/store/actions/product.action';

import {
  fetchBuyerCartAction,
  addToBuyerCartAction,
  updateBuyerCartAction,
  deleteBuyerCartAction,
} from '@/store/actions/cart.action';

import {
  fetchBuyerReviewByProductIdAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
} from '@/store/actions/review.action';

import {
  fetchProductsAction,
  fetchAllProductsAction,
  addProductAction,
  deleteProductAction,
  updateProductAction,
  uploadProductImageAction,
} from '@/store/actions/product.action';

import {
  fetchAllCategoriesAction,
  fetchAllSubCategoriesByIdAction,
} from '@/store/actions/category.action';

import {
  fetchSellerReviewsAction,
  deleteSellerReviewAction,
} from '@/store/actions/review.action';

const useProductManager = (productId) => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product || {});
  const cartState = useSelector((state) => state.cart || {});
  const reviewState = useSelector((state) => state.review || {});
  const categoryState = useSelector((state) => state.category || {});
  const reviewSellerState = useSelector((state) => state.reviews || { items: [] });

  const product = productState.productDetail || {};
  const wishlist = productState.buyerWishlist || [];
  const cart = cartState.cart || [];
  const reviewResponses = reviewState.buyerReviews || [];
  const products = productState.allProducts || [];

  const fetchProducts = () => dispatch(fetchProductsAction());

  const fetchProduct = () => {
    if (productId) {
      dispatch(fetchBuyerProductByIdAction(productId));
    }
  };
  const fetchCart = () => dispatch(fetchBuyerCartAction());
  const fetchWishlist = () => dispatch(fetchBuyerWishlistAction());
  const fetchReviews = (id) => dispatch(fetchBuyerReviewByProductIdAction(id));

  const addToCart = (payload) => dispatch(addToBuyerCartAction(payload));
  const updateCart = (payload) => dispatch(updateBuyerCartAction(payload));
  const deleteCartItem = (id) => dispatch(deleteBuyerCartAction(id));

  const addToWishlist = (payload) => dispatch(addToBuyerWishlistAction(payload));
  const updateReview = (payload) => dispatch(updateBuyerReviewAction(payload));
  const deleteReview = (id) => dispatch(deleteBuyerReviewAction(id));

  const fetchAllProducts = () => dispatch(fetchAllProductsAction());
  const fetchSellerProducts = fetchAllProducts;
  const addSellerProduct = (payload) => dispatch(addProductAction(payload));
  const deleteSellerProduct = (id) => dispatch(deleteProductAction(id));
  const updateSellerProduct = (payload) => dispatch(updateProductAction(payload));
  const uploadProductImage = (formData) => dispatch(uploadProductImageAction(formData));

  const fetchSellerCategories = () => dispatch(fetchAllCategoriesAction());
  const fetchSellerSubcategoriesByCategoryId = (categoryId) =>
    dispatch(fetchAllSubCategoriesByIdAction(categoryId));

  const fetchSellerReviews = () => dispatch(fetchSellerReviewsAction());
  const deleteSellerReview = (id) => dispatch(deleteSellerReviewAction(id));


  useEffect(() => {
    fetchCart();
    fetchWishlist();
    fetchAllProducts();
  }, [dispatch]);

  useEffect(() => {
    fetchProduct();
  }, [productId, dispatch]);

  useEffect(() => {
    if (product?.id) {
      fetchReviews(product.id);
    }
  }, [product?.id, dispatch]);

  return {
    product,
    cart,
    wishlist,
    products,
    reviewResponses,
    loading: productState.loading || false,
    error: productState.error || null,

    fetchProduct,
    fetchCart,
    fetchWishlist,
    fetchReviews,
    addToCart,
    updateCart,
    deleteCartItem,
    addToWishlist,
    updateReview,
    deleteReview,

    sellerProducts: products,
    sellerCategories: categoryState.categories || [],
    sellerReviews: reviewSellerState.items || [],

    fetchAllProducts,
    fetchSellerProducts,
    addSellerProduct,
    deleteSellerProduct,
    updateSellerProduct,
    uploadProductImage,
    fetchSellerCategories,
    fetchSellerSubcategoriesByCategoryId,
    fetchSellerReviews,
    deleteSellerReview,
  };
};

export default useProductManager;
