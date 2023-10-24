import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.status = false;
      state.userData = null;
    }
  }
});

export const { login,logOut } = authSlice.actions;

export default authSlice.reducer;
