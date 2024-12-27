import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchAllUsers,
  //   fetchAllReviews,
  //   fetchAllOrders,
  //   fetchAdminDashboardData,
} from "../actions/adminActions";

const initialState = {
  products: [],
  users: [],
  reviews: [],
  orders: [],
  dashboardStats: {},
  loading: false,
  error: null,
  success: false,
};

const adminDashboardSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchAllProducts for Admin
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.products;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchAllUsers
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchAllReviews
    // builder
    //   .addCase(fetchAllReviews.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchAllReviews.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.reviews = action.payload.data.reviews;
    //   })
    //   .addCase(fetchAllReviews.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });

    // // Handle fetchAllOrders
    // builder
    //   .addCase(fetchAllOrders.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchAllOrders.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.orders = action.payload.data.orders;
    //   })
    //   .addCase(fetchAllOrders.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });

    // // Handle fetching dashboard stats (products, users, orders, reviews summary)
    // builder
    //   .addCase(fetchAdminDashboardData.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchAdminDashboardData.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.dashboardStats = action.payload.data;
    //   })
    //   .addCase(fetchAdminDashboardData.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const { clearErrors, resetSuccess } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
