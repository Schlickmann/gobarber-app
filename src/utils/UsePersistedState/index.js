import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => JSON.parse(AsyncStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  function getState() {
    return JSON.parse(AsyncStorage.getItem(key));
  }

  return [state, setState, getState];
}
