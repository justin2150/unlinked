import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  frontID: ['', 'This photo is required', false],
  backID: ['', 'This photo is required', false],
  selfieID: ['', 'This photo is required', false],
  // frontSSN: ['', 'This photo is required', false],
  // backSSN: ['', 'This photo is required', false],
  // proofAddr: ['', 'This file is required', false],
};

const idSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    populatePhoto: {
      prepare(label, value) {
        return { payload: { label, value } };
      },
      reducer(state, { payload }) {
        const { label, value } = payload;
        if (value) {
          state[label][0] = value;
          state[label][1] = '';
          state[label][2] = false;
        }
      },
    },
    displayErr(state, { payload }) {
      state[payload][2] = true;
    },
  },
});

export const { populatePhoto, displayErr } = idSlice.actions;

export default idSlice.reducer;
