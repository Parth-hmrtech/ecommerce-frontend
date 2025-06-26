import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAllProductsAction,
  addProductAction,
  deleteProductAction,
  updateProductAction,
  uploadProductImageAction,
} from '@/store/actions/seller/seller-product.action';

import { fetchAllCategoriesAction } from '@/store/actions/seller/seller-category.action';
import { fetchAllSubCategoriesByIdAction } from '@/store/actions/seller/seller-sub-category.action';

import {
  fetchSellerReviewsAction,
  deleteSellerReviewAction,
} from '@/store/actions/seller/seller-review.action';

const useSellerProduct = () => {
  const dispatch = useDispatch();

  // ---------- Product Actions ----------
  const fetchSellerProducts = () => {
    return dispatch(fetchAllProductsAction());
  };

  const addSellerProduct = (payload) => {
    return dispatch(addProductAction(payload));
  };

  const deleteSellerProduct = (productId) => {
    return dispatch(deleteProductAction(productId));
  };

  const updateSellerProduct = (payload) => {
    return dispatch(updateProductAction(payload));
  };

  const uploadProductImage = (formData) => {
    return dispatch(uploadProductImageAction(formData));
  };

  // ---------- Category & Subcategory ----------
  const fetchSellerCategories = () => {
    return dispatch(fetchAllCategoriesAction());
  };

  const fetchSellerSubcategoriesByCategoryId = (categoryId) => {
    return dispatch(fetchAllSubCategoriesByIdAction(categoryId));
  };

  // ---------- Review Actions ----------
  const fetchSellerReviews = () => {
    return dispatch(fetchSellerReviewsAction());
  };

  const deleteSellerReview = (reviewId) => {
    return dispatch(deleteSellerReviewAction(reviewId));
  };

  // ---------- Selectors ----------
  const sellerProduct = useSelector((state) => state.sellerProduct);
  const sellerCategories = useSelector((state) => state.sellerCategories);
  const sellerSubcategories = useSelector((state) => state.sellerSubcategories);
  const sellerReviews = useSelector((state) => state.sellerReviews);

  return {
    // Product
    fetchSellerProducts,
    addSellerProduct,
    deleteSellerProduct,
    updateSellerProduct,
    uploadProductImage,

    // Category
    fetchSellerCategories,
    fetchSellerSubcategoriesByCategoryId,

    // Reviews
    fetchSellerReviews,
    deleteSellerReview,

    // State
    sellerProduct,
    sellerCategories,
    sellerSubcategories,
    sellerReviews,
  };
};

export default useSellerProduct;
