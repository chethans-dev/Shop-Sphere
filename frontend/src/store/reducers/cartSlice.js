import { createSlice } from "@reduxjs/toolkit";

// Helper to load cart from localStorage
const loadCartFromStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart
    ? JSON.parse(cart)
    : { cartItems: [], totalQuantity: 0, subTotalPrice: 0, shippingInfo: {} };
};

// Helper to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.subTotalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      saveCartToStorage(state);
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.subTotalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      saveCartToStorage(state);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.subTotalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      saveCartToStorage(state);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.subTotalPrice = 0;
      saveCartToStorage(state);
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
      saveCartToStorage(state);
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  clearErrors,
  saveShippingInfo
} = cartSlice.actions;

export default cartSlice.reducer;
