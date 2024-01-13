import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  mailbox: '',
  secret: '',
};

const slice = createSlice({
  name: 'idme',
  initialState,
  reducers: {
    populateId(state, { payload }) {
      state.id = payload;
    },
    populateMail(state, { payload }) {
      state.mailbox = payload;
    },
    populateSecret(state, { payload }) {
      state.secret = payload;
      console.log(payload);
    },
  },
});

export const { populateId, populateMail, populateSecret } = slice.actions;
export default slice.reducer;
