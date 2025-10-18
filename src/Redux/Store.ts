import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Authosclice";
import cartReducer from "./CartSlice";
import favoritesReducer from "./FavSlice"
import ordersReducer from "./OrderSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    orders:ordersReducer

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
