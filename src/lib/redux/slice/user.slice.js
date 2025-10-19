import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    updateUserName(state, action) {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateUserName } = profileSlice.actions;
export default profileSlice.reducer;
