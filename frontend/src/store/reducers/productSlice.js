import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductDetails,
  fetchProductCategories
} from "../actions/productActions";

const initialState = {
  products: [],
  product: {},
  reviews: [],
  categories: [],
  loading: false,
  error: null,
  isDeleted: false,
  isUpdated: false,
  success: false,
};

// Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.success = false;
    },
    resetIsDeleted(state) {
      state.isDeleted = false;
    },
    resetIsUpdated(state) {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchAllProducts
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.products;
        state.productsCount = action.payload.data.totalProducts;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchProductDetails
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle categories
    builder
      .addCase(fetchProductCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, resetSuccess, resetIsDeleted, resetIsUpdated } =
  productSlice.actions;

export default productSlice.reducer;
