import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function usePersistedState(db, defaultValue) {
  const [state, setState] = useState(
    async () => JSON.parse(await AsyncStorage.getItem(db)) || defaultValue
  );

  useEffect(() => {
    async function setData() {
      const data = JSON.parse(await AsyncStorage.getItem(db));

      let newData = state;

      if (data) {
        newData = { ...data, ...state };
      }

      try {
        await AsyncStorage.setItem(db, JSON.stringify(newData));
      } catch (error) {
        console.tron.error('set Item failed with error: ', error);
      }

      const response = JSON.parse(await AsyncStorage.getItem(db));
      console.tron.log(response);
    }

    setData();
  }, [db, state]);

  async function getData() {
    const response = await AsyncStorage.getItem(db);
    return JSON.parse(response);
  }

  return [state, setState, getData];
}
