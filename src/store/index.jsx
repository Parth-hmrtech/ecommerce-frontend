// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import sellerProductReducer from './reducers/sellerProductReducer';
import categoryReducer from './reducers/sellerCategoryReducer';
import subCategoryReducer from './reducers/sellerSubCategoryReducer';
import sellerOrderReducer from './reducers/sellerOrderReducer';
import sellerPaymentReducer from './reducers/sellerPaymentReducer';
import sellerReviewReducer from './reducers/sellerReviewReducer';
import sellerProfileReducer from './reducers/sellerProfileReducer'; // <-- ✅ Add this line

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
    sellerProduct: sellerProductReducer,
    sellerOrders: sellerOrderReducer,
    sellerPayments: sellerPaymentReducer,
    sellerReviews: sellerReviewReducer,
    sellerProfile: sellerProfileReducer, // <-- ✅ Add reducer key here
  },
});

export default store;
