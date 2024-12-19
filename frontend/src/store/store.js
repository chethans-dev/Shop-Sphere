import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: { product: productReducer, user: userReducer },
});

export default store;
