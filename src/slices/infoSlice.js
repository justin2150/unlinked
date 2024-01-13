import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: '',
  firstName: '',
  lastName: '',
  DOB: '',
  SSN: '',
  phone: '',
  fieldError: {},
  address: {},
  addrError: {},
};

const slice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    updateStatus(state, { payload }) {
      state.status = payload;
    },
    updateField: {
      prepare(field, value) {
        return { payload: { field, value } };
      },
      reducer(state, { payload }) {
        const { field, value } = payload;
        state[field] = value;
        state.fieldError[`${field}Error`] = '';
      },
    },
    fieldError: {
      prepare(field, error) {
        return { payload: { field, error } };
      },
      reducer(state, { payload }) {
        const { field, error } = payload;
        state.fieldError[`${field}Error`] = error;
      },
    },
    updateAddr: {
      prepare(type, value) {
        return { payload: { type, value } };
      },
      reducer(state, { payload }) {
        const { type, value } = payload;
        state.address[type] = value;
        state.addrError[`${type}Error`] = '';
      },
    },
    addrError: {
      prepare(type, error) {
        return { payload: { type, error } };
      },
      reducer(state, { payload }) {
        const { type, error } = payload;
        state.addrError[`${type}Error`] = error;
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

export const {
  updateStatus,
  updateField,
  fieldError,
  updateAddr,
  addrError,
  populateFields,
} = slice.actions;

export default slice.reducer;
