import { ref, watch } from 'vue';

const parseJSON = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Failed to parse localStorage key "${value}":`, error);
    return fallback;
  }
};

export const getStorageValue = (key, fallback = null) => {
  const raw = window.localStorage.getItem(key);
  return parseJSON(raw, fallback);
};

export const setStorageValue = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const useLocalStorage = (key, defaultValue) => {
  const storedValue = getStorageValue(key, defaultValue);
  const state = ref(storedValue);

  watch(
    state,
    (val) => {
      setStorageValue(key, val);
    },
    { deep: true }
  );

  return state;
};
