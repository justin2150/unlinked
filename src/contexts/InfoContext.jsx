import { createContext, useContext, useReducer } from "react";

const Context = createContext();

const initialState = {
  status: "",
  firstName: "",
  lastName: "",
  DOB: "",
  SSN: "",
  phone: "",
  fieldError: {},
  address: {},
  addrError: {},
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "info/updateStatus":
      return { ...state, status: payload };

    case "info/updateField":
      const { inputfield, val } = payload;
      return {
        ...state,
        [inputfield]: val,
        fieldError: { ...state.fieldError, [`${inputfield}Error`]: "" },
      };
    case "info/fieldError":
      const { field, err } = payload;
      return {
        ...state,
        fieldError: { ...state.fieldError, [`${field}Error`]: err },
      };

    case "info/updateAddr":
      const { type, value } = payload;
      return {
        ...state,
        address: { ...state.address, [type]: value },
        addrError: { ...state.addrError, [`${type}Error`]: "" },
      };
    case "info/addrError":
      const { errType, error } = payload;
      return {
        ...state,
        addrError: { ...state.addrError, [`${errType}Error`]: error },
      };

    default:
      return { ...state };
  }
}

export default function InfoProvider({ children }) {
  const [
    {
      status,
      firstName,
      lastName,
      DOB,
      SSN,
      phone,
      fieldError,
      address,
      addrError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <Context.Provider
      value={{
        status,
        firstName,
        lastName,
        DOB,
        SSN,
        phone,
        fieldError,
        address,
        addrError,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useInfo() {
  const context = useContext(Context);
  return context;
}

export function updateStatus(status) {
  return { type: "info/updateStatus", payload: status };
}

export function updateField(inputfield, val) {
  return { type: "info/updateField", payload: { inputfield, val } };
}
export function fieldError(field, err) {
  return { type: "info/fieldError", payload: { field, err } };
}

export function updateAddr(type, value) {
  return { type: "info/updateAddr", payload: { type, value } };
}
export function addrError(errType, error) {
  return { type: "info/addrError", payload: { errType, error } };
}
