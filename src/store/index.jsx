import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth/auth.reducer';

import sellerProductReducer from './reducers/seller/seller-product.reducer';
import categoryReducer from './reducers/seller/seller-category.reducer';
import subCategoryReducer from './reducers/seller/seller-sub-category.reducer';
import sellerOrderReducer from './reducers/seller/seller-order.reducer';
import sellerPaymentReducer from './reducers/seller/seller-payment.reducer';
import sellerReviewReducer from './reducers/seller/seller-review.reducer';
import sellerProfileReducer from './reducers/seller/seller-profile.reducer';

import buyerReducer from './reducers/buyer/buyer.reducer';
import buyerProductReducer from './reducers/buyer/buyer-product.reducer';
import buyerCartReducer from './reducers/buyer/buyer-cart.reducer';
import buyerOrderReducer from './reducers/buyer/buyer-order.reducer';
import buyerPaymentReducer from './reducers/buyer/buyer-payment.reducer';
import buyerWishlistReducer from './reducers/buyer/buyer-wish-list.reducer';
import buyerReviewReducer from './reducers/buyer/buyer-review.reducer';
import buyerProfileReducer from './reducers/buyer/buyer-profile.reducer';

import productReducer from './reducers/product.reducer';

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
   devTools: true,
});

export default store;
