import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchProductsAction,
  fetchBuyerProductByIdAction,
  fetchBuyerWishlistAction,
  addToBuyerWishlistAction,
  deleteFromBuyerWishlistAction,
  fetchAllProductsAction,
  addProductAction,
  deleteProductAction,
  updateProductAction,
  uploadProductImageAction,
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
  fetchSellerReviewsAction,
  deleteSellerReviewAction,
} from '@/store/actions/review.action';

import {
  fetchAllCategoriesAction,
  fetchAllSubCategoriesByIdAction,
} from '@/store/actions/category.action';

const useProductManager = (productId) => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product || {});
  const cartState = useSelector((state) => state.cart || {});
  const reviewState = useSelector((state) => state.review || {});
  const categoryState = useSelector((state) => state.category || {});

  const product = productState.productDetail || {};
  const products = productState.products || [];
  const wishlist = productState.buyerWishlist || [];
  const cart = cartState.cart || [];
  const reviewResponses = reviewState.buyerReviews || [];

  const sellerProducts = productState.products || [];
  const sellerCategories = categoryState.list || [];
  const sellerSubcategories = categoryState.subcategoriesByCategory || [];
  const sellerReviews = reviewState.sellerReviews || [];
  const sellerLoading = productState.loading || false;
  const sellerError = productState.error || null;

  const fetchProduct = async () => {
    if (productId) {
      return await dispatch(fetchBuyerProductByIdAction(productId));
    }
  };

  const fetchBuyerProducts = async () => {
    return await dispatch(fetchProductsAction());
  };

  const fetchWishlist = async () => {
    return await dispatch(fetchBuyerWishlistAction());
  };

  const fetchCart = async () => {
    return await dispatch(fetchBuyerCartAction());
  };

  const fetchReviews = async (id) => {
    if (id) {
      return await dispatch(fetchBuyerReviewByProductIdAction(id));
    }
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

  const deleteFromWishlist = async (productId) => {
    await dispatch(deleteFromBuyerWishlistAction(productId));
    await dispatch(fetchBuyerWishlistAction());
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
    fetchWishlist();
    fetchBuyerProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product?.id) {
      fetchReviews(product.id);
    }
  }, [product?.id]);

  return {
    product,
    products,
    wishlist,
    cart,
    reviewResponses,
    loading: productState.loading || false,
    error: productState.error || null,

    fetchProduct,
    fetchBuyerProducts,
    fetchCart,
    fetchWishlist,
    fetchReviews,
    addToCart,
    updateCart,
    deleteCartItem,
    addToWishlist,
    deleteFromWishlist,
    updateReview,
    deleteReview,

    sellerProducts,
    sellerCategories,
    sellerSubcategories,
    sellerReviews,
    sellerLoading,
    sellerError,
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
