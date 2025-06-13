import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer.js';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
