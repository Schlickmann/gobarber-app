import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function usePersistedState(db, defaultValue) {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    async function loadData() {
      let response = await AsyncStorage.getItem(db);
      response = JSON.parse(response);

      if (Object.keys(response).length !== 0) {
        if (!('isRetrievingData' in response)) {
          setState(response);
        } else {
          setState({});
        }
      }
    }
    loadData();
  }, [db]);

  useEffect(() => {
    async function setData() {
      try {
        await AsyncStorage.setItem(db, JSON.stringify(state));
      } catch (error) {
        console.tron.error('set Item failed with error: ', error);
      }
    }

    setData();
  }, [db, state]);

  async function getData() {
    const response = await AsyncStorage.getItem(db);
    return JSON.parse(response);
  }

  return [state, setState, getData];
}
