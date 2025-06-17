import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import sellerProductReducer from './reducers/sellerProductReducer';
import categoryReducer from './reducers/sellerCategoryReducer';
import subCategoryReducer from './reducers/sellerSubCategoryReducer';
import sellerOrderReducer from './reducers/sellerOrderReducer'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
    sellerProduct: sellerProductReducer,
    sellerOrders: sellerOrderReducer, 
  },
});

export default store;
