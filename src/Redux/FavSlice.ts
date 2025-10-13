import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavItem } from "../types/FavItem";

const initialState = { items: [] as FavItem[] };

const favSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorite(state, action: PayloadAction<FavItem>) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      } else {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
    },
    removeFromFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    removeAllFavorite(state) {
      state.items = [];
    },
  },
});

export default favSlice.reducer;
export const { addToFavorite, removeFromFavorite, removeAllFavorite } =
  favSlice.actions;
