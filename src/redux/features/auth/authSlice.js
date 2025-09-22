import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: undefined,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      // Store user info in cookies
      Cookies.set('userInfo', JSON.stringify(payload), { expires: 7 });
    },
    userLoggedOut: (state) => {
      state.user = undefined;
      state.loading = false;
      Cookies.remove('userInfo');
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
