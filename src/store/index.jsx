import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/reducers/auth/auth.reducer';

import sellerProductReducer from '@/store/reducers/seller/seller-product.reducer';
import categoryReducer from '@/store/reducers/seller/seller-category.reducer';
import subCategoryReducer from '@/store/reducers/seller/seller-sub-category.reducer';
import sellerOrderReducer from '@/store/reducers/seller/seller-order.reducer';
import sellerPaymentReducer from '@/store/reducers/seller/seller-payment.reducer';
import sellerReviewReducer from '@/store/reducers/seller/seller-review.reducer';
import sellerProfileReducer from '@/store/reducers/seller/seller-profile.reducer';

import buyerCategoryReducer from '@/store/reducers/buyer/buyer-category.reducer';
import buyerProductReducer from '@/store/reducers/buyer/buyer-product.reducer';
import buyerCartReducer from '@/store/reducers/buyer/buyer-cart.reducer';
import buyerOrderReducer from '@/store/reducers/buyer/buyer-order.reducer';
import buyerPaymentReducer from '@/store/reducers/buyer/buyer-payment.reducer';
import buyerWishlistReducer from '@/store/reducers/buyer/buyer-wish-list.reducer';
import buyerReviewReducer from '@/store/reducers/buyer/buyer-review.reducer';
import buyerProfileReducer from '@/store/reducers/buyer/buyer-profile.reducer';

import productReducer from '@/store/reducers/product.reducer';

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

    buyerCategory: buyerCategoryReducer,
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
