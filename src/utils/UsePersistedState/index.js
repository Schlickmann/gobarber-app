import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    async () => (await AsyncStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    async function setStorageItem() {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    }

    setStorageItem();
  }, [key, state]);

  function getState() {
    return JSON.parse(AsyncStorage.getItem(key));
  }

  return [state, setState, getState];
}
