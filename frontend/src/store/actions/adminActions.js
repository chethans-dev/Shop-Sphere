import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "adminDashboard/fetchAllProducts",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/products/admin");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "adminDashboard/fetchAllUsers",
  async () => {
    const response = await fetch("/api/v1/admin/users");
    const data = await response.json();
    return data;
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/v1/products",
        productData,
        config
      );
      toast.success("Product created succcessfully.", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/products/${id}`);
      toast.success("Product deleted succcessfully.", {
        position: "top-right",
      });
      return id;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/products/${id}`, product);
      toast.success("Product updated succcessfully.", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get all orders
export const getAllOrders = createAsyncThunk(
  "product/getAllOrders",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/orders");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update order
export const updateOrder = createAsyncThunk(
  "product/updateOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/orders/${id}`, status);
      toast.success("Order updated succcessfully.", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "product/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/orders/${id}`);
      toast.success("Order deleted succcessfully.", {
        position: "top-right",
      });
      return id;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get all users
export const getAllUsers = createAsyncThunk(
  "product/getAllUsers",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/all");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  "product/updateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/users/${id}`, role);
      toast.success("User role updated succcessfully.", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "product/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/users/${id}`);
      toast.success("User deleted succcessfully.", {
        position: "top-right",
      });
      return id;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get all reviews of a product
export const getAllReviews = createAsyncThunk(
  "product/getAllReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/reviews?pid=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete review
export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async ({ rid, pid }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/products/reviews?rid=${rid}&pid=${pid}`);
      toast.success("Review deleted succcessfully.", {
        position: "top-right",
      });
      return rid;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);
