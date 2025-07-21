import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export const useReviewHistory = () => {
  const [history, setHistory] = useLocalStorage('codeReviewHistory', []);

  const addToHistory = (review) => {
    const newReview = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...review
    };
    
    setHistory(prev => [newReview, ...prev.slice(0, 9)]); // Keep only last 10 reviews
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
};