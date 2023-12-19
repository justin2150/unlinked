import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  mailbox: "",
};

const slice = createSlice({
  name: "idme",
  initialState,
  reducers: {
    populateId(state, { payload }) {
      state.id = payload;
    },
    populateMail(state, { payload }) {
      state.mailbox = payload;
    },
  },
});

export const { populateId, populateMail } = slice.actions;
export default slice.reducer;
