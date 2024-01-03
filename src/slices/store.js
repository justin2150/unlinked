import { configureStore } from '@reduxjs/toolkit';
import infoSlice from './infoSlice';
import idmeSlice from './idme';
import idSlice from './uploadID';

const store = configureStore({
  reducer: {
    info: infoSlice,
    idme: idmeSlice,
    id: idSlice,
  },
});

export default store;
