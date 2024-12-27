import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "adminDashboard/fetchAllProducts",
  async () => {
    const response = await fetch("/api/v1/products/admin");
    const data = await response.json();
    return data;
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
