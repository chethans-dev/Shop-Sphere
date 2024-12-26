// src/redux/order/orderActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Action to create an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/orders", orderData, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message, {
        position: "top-right",
      });
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

export const myOrders = createAsyncThunk(
  "order/myOrders",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/orders", {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message, {
        position: "top-right",
      });
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your orders"
      );
    }
  }
);
