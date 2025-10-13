import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("userToken"), 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("userToken", action.payload); 
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("userToken"); 
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
