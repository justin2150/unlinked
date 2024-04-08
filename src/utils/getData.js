export const saveLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocal = (key) => localStorage.getItem(key);
