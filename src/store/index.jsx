import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';

import sellerProductReducer from './reducers/sellerProductReducer';
import categoryReducer from './reducers/sellerCategoryReducer';
import subCategoryReducer from './reducers/sellerSubCategoryReducer';
import sellerOrderReducer from './reducers/sellerOrderReducer';
import sellerPaymentReducer from './reducers/sellerPaymentReducer';
import sellerReviewReducer from './reducers/sellerReviewReducer';
import sellerProfileReducer from './reducers/sellerProfileReducer';

import buyerReducer from './reducers/buyerReducer';
import buyerProductReducer from './reducers/buyerProductReducer';
import buyerCartReducer from './reducers/buyerCartReducer';
import buyerOrderReducer from './reducers/buyerOrderReducer';
import buyerPaymentReducer from './reducers/buyerPaymentReducer';
import buyerWishlistReducer from './reducers/buyerwishlistReducer';
import buyerReviewReducer from './reducers/buyerReviewReducer';
import buyerProfileReducer from './reducers/buyerProfileReducer';


import productReducer from './reducers/productReducer';

const store = configureStore({
  reducer: {
    
    auth: authReducer,

    sellerProduct: sellerProductReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
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
    buyerProfile: buyerProfileReducer,

    product: productReducer,
  },
});

export default store;
