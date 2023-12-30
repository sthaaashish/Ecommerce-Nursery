import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { orderApi } from "./orderApi";
import { productApi } from "./ProductApi";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
        user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ]),
});
