import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

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

// Update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/users/me", payload);
      toast.success("User updated succcessfully.", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update avatar
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/users/avatar", payload);
      toast.success("Avatar updated succcessfully.", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/users/updatePassword", payload);
      toast.success("Password updated succcessfully.", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/users/forgotPassword",
        payload
      );
      toast.success(data?.message, {
        position: "top-right",
      });
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/v1/users/resetPassword/${token}`,
        payload
      );
      toast.success(data?.message, {
        position: "top-right",
      });
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
