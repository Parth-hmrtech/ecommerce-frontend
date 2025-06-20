import { configureStore } from '@reduxjs/toolkit';

// Auth
import authReducer from './reducers/authReducer';

// Seller
import sellerProductReducer from './reducers/sellerProductReducer';
import categoryReducer from './reducers/sellerCategoryReducer';
import subCategoryReducer from './reducers/sellerSubCategoryReducer';
import sellerOrderReducer from './reducers/sellerOrderReducer';
import sellerPaymentReducer from './reducers/sellerPaymentReducer';
import sellerReviewReducer from './reducers/sellerReviewReducer';
import sellerProfileReducer from './reducers/sellerProfileReducer';

// Buyer
import buyerReducer from './reducers/buyerReducer';
import buyerProductReducer from './reducers/buyerProductReducer';
import buyerCartReducer from './reducers/buyerCartReducer';
import buyerOrderReducer from './reducers/buyerOrderReducer';
import buyerPaymentReducer from './reducers/buyerPaymentReducer';
import buyerWishlistReducer from './reducers/buyerwishlistReducer';
import buyerReviewReducer from './reducers/buyerReviewReducer';
import buyerProfileReducer from './reducers/buyerProfileReducer';

// Product
import productReducer from './reducers/productReducer';

const store = configureStore({
  reducer: {
    // Auth
    auth: authReducer,

    // Seller
    sellerProduct: sellerProductReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
    sellerOrders: sellerOrderReducer,
    sellerPayments: sellerPaymentReducer,
    sellerReviews: sellerReviewReducer,
    sellerProfile: sellerProfileReducer,

    // Buyer
    buyer: buyerReducer,
    buyerProduct: buyerProductReducer,
    buyerCart: buyerCartReducer,
    buyerOrder: buyerOrderReducer,
    buyerPayment: buyerPaymentReducer,
    buyerWishlist: buyerWishlistReducer,
    buyerReview: buyerReviewReducer,
    buyerProfile: buyerProfileReducer,

    // Product (shared/global)
    product: productReducer,
  },
});

export default store;
