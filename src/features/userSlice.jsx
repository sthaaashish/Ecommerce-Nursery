import { createSlice } from "@reduxjs/toolkit";
import {
  clearLocal,
  getCart,
  getUser,
  getWishList,
  setCart,
  setUser,
  setWishList,
  clearCart,
} from "./localStorage";

const initialState = {
  user: getUser(),
  carts: getCart(),
  wishList: getWishList(),
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addOrUpdateUser: (state, action) => {
      state.user = action.payload;
      setUser(state.user);
    },
    addOrUpdateCart: (state, action) => {
      const isExist = state.carts.find(
        (cart) => cart.product === action.payload.product
      );

      if (isExist) {
        state.carts = state.carts.map((cart) =>
          cart.product === isExist.product ? action.payload : cart
        );
        setCart(state.carts);
      } else {
        state.carts.push(action.payload);
        setCart(state.carts);
      }
    },
    addToWishlist: (state, action) => {
      state.wishList.push(action.payload);
      setWishList(state.wishList);
    },
    removeCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      setCart(state.carts);
    },
    removeWishList: (state, action) => {
      state.wishList.splice(action.payload, 1);
      setWishList(state.wishList);
    },
    updateUser: (state, action) => {
      state.user.email = action.payload.email || state.user.email;
      state.user.shippingAddress =
        action.payload.shippingAddress || state.user.shippingAddress;
      state.user.fullname = action.payload.fullname || state.user.fullname;
      setUser(state.user);
    },
    clearAll: (state, action) => {
      state.user = null;
      state.carts = [];
      clearLocal();
    },
    clearCartItem: (state, action) => {
      state.carts = [];
      clearCart();
    },
  },
});
export const {
  clearAll,
  removeCart,
  removeWishList,
  addOrUpdateCart,
  addToWishlist,
  addOrUpdateUser,
  updateUser,
  clearCartItem,
} = userSlice.actions;
export default userSlice.reducer;
