import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Authosclice";
import cartReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
