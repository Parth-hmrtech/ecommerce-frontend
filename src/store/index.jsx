import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export default store;
