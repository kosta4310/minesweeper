import { configureStore } from "@reduxjs/toolkit";
import cellReducer from "./cellSlice";

export const store = configureStore({
  reducer: {
    cells: cellReducer,
  },
});
