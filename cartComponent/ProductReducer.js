import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.product.push({ ...action.payload });
    },
    incrementProductsQuantity: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decrementProductsQuantity: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity === 1) {
        itemPresent.quantity--;
        const removeFromCart = state.product.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeFromCart;
      } else {
        itemPresent.quantity--;
      }
    },
    resetProductsQuantity: (state) => {
      state.product = state.product.map((item) => ({
        ...item,
        quantity: 0,
      }));
    },
  },
});

export const {
  getProducts,
  incrementProductsQuantity,
  decrementProductsQuantity,
  resetProductsQuantity,
} = productSlice.actions;

export default productSlice.reducer;
