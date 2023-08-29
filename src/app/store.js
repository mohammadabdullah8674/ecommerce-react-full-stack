import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from "../features/product-list/productSlice"
import authReducer from '../features/auth/authSlice';
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/OrderSlice"


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    auth : authReducer,
    cart : cartReducer,
    order : orderReducer
  },
});
