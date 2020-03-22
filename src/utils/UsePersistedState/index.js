import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    async () => JSON.parse(await AsyncStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    async function setStorageItem() {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    }

    setStorageItem();
  }, [key, state]);

  async function getState() {
    const response = await AsyncStorage.getItem(key);
    return JSON.parse(response);
  }

  return [state, setState, getState];
}
