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

  const fetchProducts = async () => {
    return await dispatch(fetchProductsAction());
  };

  const fetchProduct = async () => {
    if (productId) {
      return await dispatch(fetchBuyerProductByIdAction(productId));
    }
  };

  const fetchCart = async () => {
    return await dispatch(fetchBuyerCartAction());
  };

  const fetchWishlist = async () => {
    return await dispatch(fetchBuyerWishlistAction());
  };

  const fetchReviews = async (id) => {
    return await dispatch(fetchBuyerReviewByProductIdAction(id));
  };

  const addToCart = async (payload) => {
    return await dispatch(addToBuyerCartAction(payload));
  };

  const updateCart = async (payload) => {
    return await dispatch(updateBuyerCartAction(payload));
  };

  const deleteCartItem = async (id) => {
    return await dispatch(deleteBuyerCartAction(id));
  };

  const addToWishlist = async (payload) => {
    return await dispatch(addToBuyerWishlistAction(payload));
  };

  const updateReview = async (payload) => {
    return await dispatch(updateBuyerReviewAction(payload));
  };

  const deleteReview = async (id) => {
    return await dispatch(deleteBuyerReviewAction(id));
  };

  const fetchAllProducts = async () => {
    return await dispatch(fetchAllProductsAction());
  };

  const fetchSellerProducts = fetchAllProducts;

  const addSellerProduct = async (payload) => {
    return await dispatch(addProductAction(payload));
  };

  const deleteSellerProduct = async (id) => {
    return await dispatch(deleteProductAction(id));
  };

  const updateSellerProduct = async (payload) => {
    return await dispatch(updateProductAction(payload));
  };

  const uploadProductImage = async (formData) => {
    return await dispatch(uploadProductImageAction(formData));
  };

  const fetchSellerCategories = async () => {
    return await dispatch(fetchAllCategoriesAction());
  };

  const fetchSellerSubcategoriesByCategoryId = async (categoryId) => {
    return await dispatch(fetchAllSubCategoriesByIdAction(categoryId));
  };

  const fetchSellerReviews = async () => {
    return await dispatch(fetchSellerReviewsAction());
  };

  const deleteSellerReview = async (id) => {
    return await dispatch(deleteSellerReviewAction(id));
  };


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
