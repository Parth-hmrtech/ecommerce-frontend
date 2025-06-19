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
import buyerOrderReducer from './reducers/buyerOrderReducer';
import buyerPaymentReducer from './reducers/buyerPaymentReducer';
import buyerWishlistReducer from './reducers/buyerwishlistReducer';
import buyerReviewReducer from './reducers/buyerReviewReducer';


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
    buyerOrder: buyerOrderReducer,
    buyerPayment: buyerPaymentReducer,
    buyerWishlist: buyerWishlistReducer,
    buyerReview: buyerReviewReducer,


  },
});

export default store;
