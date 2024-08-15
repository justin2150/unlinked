import { createContext, useContext } from 'react';

const Context = createContext();

export default function AppProvider({ children }) {
  const origin = new URL(document.referrer).hostname;

  return <Context.Provider value={{ origin }}>{children}</Context.Provider>;
}

export function useAppProvider() {
  return useContext(Context);
}
