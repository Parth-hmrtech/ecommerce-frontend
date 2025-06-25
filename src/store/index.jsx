import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth/authReducer';

import sellerProductReducer from './reducers/seller/sellerProductReducer';
import categoryReducer from './reducers/seller/sellerCategoryReducer';
import subCategoryReducer from './reducers/seller/sellerSubCategoryReducer';
import sellerOrderReducer from './reducers/seller/sellerOrderReducer';
import sellerPaymentReducer from './reducers/seller/sellerPaymentReducer';
import sellerReviewReducer from './reducers/seller/sellerReviewReducer';
import sellerProfileReducer from './reducers/seller/sellerProfileReducer';

import buyerReducer from './reducers/buyer/buyerReducer';
import buyerProductReducer from './reducers/buyer/buyerProductReducer';
import buyerCartReducer from './reducers/buyer/buyerCartReducer';
import buyerOrderReducer from './reducers/buyer/buyerOrderReducer';
import buyerPaymentReducer from './reducers/buyer/buyerPaymentReducer';
import buyerWishlistReducer from './reducers/buyer/buyerwishlistReducer';
import buyerReviewReducer from './reducers/buyer/buyerReviewReducer';
import buyerProfileReducer from './reducers/buyer/buyerProfileReducer';

import productReducer from './reducers/productReducer';

const store = configureStore({
  reducer: {
    
    auth: authReducer,

    sellerProduct: sellerProductReducer,
    sellerCategories: categoryReducer,
    sellerSubcategories: subCategoryReducer,
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
