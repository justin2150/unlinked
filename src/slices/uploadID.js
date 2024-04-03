import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  frontID: '',
  backID: '',
  selfieID: '',
  frontSSN: '',
  backSSN: '',
  proofAddr: '',
};

const idSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    populatePhoto: {
      prepare(label, value) {
        return { payload: { label, value } };
      },
      reducer(state, { payload: { label, value } }) {
        if (value) {
          state[label] = value;
        }
      },
    },
  },
});

export const { populatePhoto, displayErr } = idSlice.actions;

export default idSlice.reducer;
