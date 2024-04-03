import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: '',
  firstName: '',
  lastName: '',
  DOB: '',
  SSN: '',
  phone: '',
  address: {},
};

const slice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    updateField: {
      prepare(field, value) {
        return { payload: { field, value } };
      },
      reducer(state, { payload: { field, value } }) {
        state[field] = value;
      },
    },

    updateAddr: {
      prepare(type, value) {
        return { payload: { type, value } };
      },
      reducer(state, { payload }) {
        const { type, value } = payload;
        state.address[type] = value;
      },
    },

    populateFields(state, { payload }) {
      const { firstName, lastName, DOB, SSN, phone, address } = payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.DOB = DOB;
      state.SSN = SSN;
      state.phone = phone;
      state.address = address;
    },
  },
});

export const { updateField, updateAddr, populateFields } = slice.actions;

export default slice.reducer;
