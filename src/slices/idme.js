import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  mailbox: '',
  secretKey: '',
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
      console.log(payload);
      state.secretKey = payload;
    },
  },
});

export const { populateId, populateMail, populateSecret } = slice.actions;
export default slice.reducer;
