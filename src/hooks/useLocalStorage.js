import { useState, useEffect } from "react";

// Custom hook: works like useState, but the value is also saved in
// localStorage, so it survives a page refresh.
//
//   const [budget, setBudget] = useLocalStorage("budget", 0);
//
// initialValue is used only when nothing is saved yet. It can be a value,
// or a function that works out the starting value.
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // saved data was broken, so fall back to the starting value
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  // Save again whenever the value changes (or if the key changes)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
