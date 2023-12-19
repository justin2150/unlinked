import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./infoSlice";
import idmeSlice from "./idme";

const store = configureStore({
  reducer: {
    info: infoSlice,
    idme: idmeSlice,
  },
});

export default store;
