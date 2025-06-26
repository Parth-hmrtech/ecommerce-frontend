// src/hooks/seller/useSellerCategory.js

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCategoriesAction,
  addCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from '@/store/actions/seller/seller-category.action';

import {
  fetchAllSubCategoriesAction,
  addSubCategoryAction,
  updateSubCategoryAction,
  deleteSubCategoryAction,
} from '@/store/actions/seller/seller-sub-category.action';

const useSellerCategory = () => {
  const dispatch = useDispatch();

  const {
    list: categories = [],
    loading: categoryLoading = false,
    error: categoryError = null,
  } = useSelector((state) => state.sellerCategories);

  const {
    list: subCategories = [],
    loading: subCategoryLoading = false,
    error: subCategoryError = null,
  } = useSelector((state) => state.sellerSubcategories);

  const fetchCategories = () => {
    return dispatch(fetchAllCategoriesAction());
  };

  const addCategory = (category_name) => {
    return dispatch(addCategoryAction({ category_name }));
  };

  const updateCategory = (id, category_name) => {
    return dispatch(updateCategoryAction({ id, category_name }));
  };

  const deleteCategory = (id) => {
    return dispatch(deleteCategoryAction(id));
  };

  const fetchSubCategories = () => {
    return dispatch(fetchAllSubCategoriesAction());
  };

  const addSubCategory = (category_id, sub_category_name) => {
    return dispatch(addSubCategoryAction({ category_id, sub_category_name }));
  };

  const updateSubCategory = (id, category_id, sub_category_name) => {
    return dispatch(updateSubCategoryAction({ id, category_id, sub_category_name }));
  };

  const deleteSubCategory = (id) => {
    return dispatch(deleteSubCategoryAction(id));
  };

  return {
    categories,
    categoryLoading,
    categoryError,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,

    subCategories,
    subCategoryLoading,
    subCategoryError,
    fetchSubCategories,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
  };
};

export default useSellerCategory;
