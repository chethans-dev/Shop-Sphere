// src/redux/order/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createOrder, myOrders } from "../actions/orderActions";
const initialState = {
  order: null,
  loading: false,
  error: null,
  success: false,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Handle createOrder async actions
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.data;
      state.success = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    // Handle all orders
    builder.addCase(myOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(myOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.data;
      state.success = true;
    });
    builder.addCase(myOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
