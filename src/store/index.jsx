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
import buyerReducer from './reducers/buyerReducer';
import buyerProductReducer from './reducers/buyerProductReducer';
import buyerCartReducer from './reducers/buyerCartReducer';


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
    sellerProfile: sellerProfileReducer,
    buyer: buyerReducer,
    buyerProduct: buyerProductReducer,
    buyerCart: buyerCartReducer,

  },
});

export default store;
