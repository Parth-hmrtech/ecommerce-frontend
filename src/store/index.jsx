import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import sellerReducer from './reducers/sellerReducer';
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    categories: sellerReducer, 
  },
});


export default store;
