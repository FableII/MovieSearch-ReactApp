import { createSlice } from "@reduxjs/toolkit";

export interface User {
  [prop: string]: any;
  username?: string;
  email?: string;
  password?: string;
  isAuth?: boolean;
  favorites?: { name: string; url: string }[];
  historySearch?: string[];
}

const userSlice = createSlice({
  name: "user",
  initialState: {} as Record<string, User>,
  reducers: {
    signIn(state, action) {
      const currentUser = action.payload;
      state[currentUser].isAuth = true;
    },

    logOut(state, action) {
      const currentUser = action.payload;
      state[currentUser].isAuth = false;
    },

    addUser(state, action) {
      const newUser = action.payload.email;
      state[newUser] = action.payload;
      state[newUser].isAuth = false;
      state[newUser].favorites = [];
      state[newUser].historySearch = [];
      console.log("НОВЫЙ ЮЗЕР: ", state[newUser])
    },
  },
});

export const { signIn, logOut, addUser } = userSlice.actions;

export default userSlice.reducer;
