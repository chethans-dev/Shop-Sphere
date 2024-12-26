import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import userReducer from "./reducers/userSlice";
import cartReducer from "./reducers/cartSlice";
import orderReducer from "./reducers/orderSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
