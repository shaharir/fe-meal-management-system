import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../redux/slice/user.slice";
import { apiService } from "./services/apiService";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiService.middleware),
});
