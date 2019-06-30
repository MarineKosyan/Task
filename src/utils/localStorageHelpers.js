export const getItemFromStorage = name => JSON.parse(localStorage.getItem(name)) || [];

export const setItemToStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

export const pushItemToStorage = (name, item) => {
  const arr = [...getItemFromStorage(name)];
  arr.push(item);
  setItemToStorage(name, arr);
};