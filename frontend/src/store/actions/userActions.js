import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/users/login", loginData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Signup User
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (signupData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/v1/users/signup",
        signupData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Load user
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/me");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue }) => {
    try {
      await axios.get("/api/v1/users/logout");
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
