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

  // Redux States with safe fallback
  const productState = useSelector((state) => state.product || {});
  const cartState = useSelector((state) => state.cart || {});
  const reviewState = useSelector((state) => state.review || {});
  const categoryState = useSelector((state) => state.category || {});
  // const sellerReviewState = useSelector((state) => state.reviews || {});

  // Buyer-side states
  const product = productState.productDetail || {};
  const products = productState.products || [];
  const wishlist = productState.buyerWishlist || [];
  const cart = cartState.cart || [];
  const reviewResponses = reviewState.buyerReviews || [];

  // Seller-side states
  const sellerProducts = productState.products || [];
  const sellerCategories = categoryState.list || [];
  const sellerSubcategories = categoryState.subcategoriesByCategory || [];
  const sellerReviews = reviewState.sellerReviews || [];
  const sellerLoading = productState.loading || false;
  const sellerError = productState.error || null;

  // Buyer Actions
  const fetchProduct = () => dispatch(fetchBuyerProductByIdAction(productId));
  const fetchBuyerProducts = () => dispatch(fetchProductsAction());
  const fetchWishlist = () => dispatch(fetchBuyerWishlistAction());
  const fetchCart = () => dispatch(fetchBuyerCartAction());
  const fetchReviews = (id) => dispatch(fetchBuyerReviewByProductIdAction(id));

  const addToCart = (payload) => dispatch(addToBuyerCartAction(payload));
  const updateCart = (payload) => dispatch(updateBuyerCartAction(payload));
  const deleteCartItem = (id) => dispatch(deleteBuyerCartAction(id));

  const addToWishlist = (payload) => dispatch(addToBuyerWishlistAction(payload));
  const deleteFromWishlist = async (productId) => {
    await dispatch(deleteFromBuyerWishlistAction(productId));
    dispatch(fetchBuyerWishlistAction());
  };

  const updateReview = (payload) => dispatch(updateBuyerReviewAction(payload));
  const deleteReview = (id) => dispatch(deleteBuyerReviewAction(id));

  // Seller Actions
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

  // Initial buyer data
  useEffect(() => {
    fetchWishlist();
    fetchBuyerProducts();
    fetchCart();
  }, []);

  // Load product detail
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Load reviews for this product
  useEffect(() => {
    if (product?._id) {
      fetchReviews(product._id);
    }
  }, [product?._id]);

  return {
    // Buyer
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

    // Seller
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
