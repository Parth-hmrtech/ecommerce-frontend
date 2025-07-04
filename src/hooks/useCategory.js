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
  const categoryError = error; 
  const subCategoryError = error; 

    const fetchCategories = async () => {
    return await dispatch(fetchAllCategoriesAction());
  };

  const addCategory = async (category_name) => {
    return await dispatch(addCategoryAction({ category_name }));
  };

  const updateCategory = async (id, category_name) => {
    return await dispatch(updateCategoryAction({ id, category_name }));
  };

  const deleteCategory = async (id) => {
    return await dispatch(deleteCategoryAction(id));
  };

  const fetchSubCategories = async () => {
    return await dispatch(fetchAllSubCategoriesAction());
  };

  const addSubCategory = async (category_id, sub_category_name) => {
    return await dispatch(addSubCategoryAction({ category_id, sub_category_name }));
  };

  const updateSubCategory = async (id, category_id, sub_category_name) => {
    return await dispatch(updateSubCategoryAction({ id, category_id, sub_category_name }));
  };

  const deleteSubCategory = async (id) => {
    return await dispatch(deleteSubCategoryAction(id));
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
    message,
  };
};

export default useSellerCategory;
