import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCategoriesAction,
  addCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
  fetchAllSubCategoriesAction,
  addSubCategoryAction,
  updateSubCategoryAction,
  deleteSubCategoryAction,
} from '@/store/actions/category.action';

const useSellerCategory = () => {
  const dispatch = useDispatch();

  const {
    list: categories = [],
    subcategories: subCategories = [],
    loading = '',
    error = false,
    message = '',
  } = useSelector((state) => state.category || {});

  const categoryLoading = loading.includes('Category');
  const subCategoryLoading = loading.includes('Subcategory');
  const categoryError = error; // generic error for both
  const subCategoryError = error; // same

  // --- Category Actions ---
  const fetchCategories = () => dispatch(fetchAllCategoriesAction());
  const addCategory = (category_name) => dispatch(addCategoryAction({ category_name }));
  const updateCategory = (id, category_name) =>
    dispatch(updateCategoryAction({ id, category_name }));
  const deleteCategory = (id) => dispatch(deleteCategoryAction(id));

  // --- Subcategory Actions ---
  const fetchSubCategories = () => dispatch(fetchAllSubCategoriesAction());
  const addSubCategory = (category_id, sub_category_name) =>
    dispatch(addSubCategoryAction({ category_id, sub_category_name }));
  const updateSubCategory = (id, category_id, sub_category_name) =>
    dispatch(updateSubCategoryAction({ id, category_id, sub_category_name }));
  const deleteSubCategory = (id) => dispatch(deleteSubCategoryAction(id));

  return {
    // Category
    categories,
    categoryLoading,
    categoryError,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,

    // Subcategory
    subCategories,
    subCategoryLoading,
    subCategoryError,
    fetchSubCategories,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    message,
  };
};

export default useSellerCategory;
