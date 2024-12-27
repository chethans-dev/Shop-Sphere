import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Define Thunks for async actions
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (queryParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products`, {
        params: queryParams,
      });
      return data; // This will be action.payload
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/admin/product", productData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/product/${id}`);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchProductCategories = createAsyncThunk(
  "product/fetchProductCategories",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createReview = createAsyncThunk(
  "product/createReview",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/products/review`, payload);
      toast.success("Review submitted successfully!", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
