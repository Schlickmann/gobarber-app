// import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export async function getData(db) {
  const response = await AsyncStorage.getItem(db);
  return JSON.parse(response);
}

export async function setData(db, key, value) {
  const data = await getData(db);

  const updated = typeof key === 'object' ? key : { [key]: value };

  let newData = updated;

  if (data) {
    newData = { ...data, ...updated };
  }

  try {
    await AsyncStorage.setItem(db, JSON.stringify(newData));
  } catch (error) {
    console.tron.error('set Item failed with error: ', error);
  }

  const response = await getData(db);
  console.tron.log(response);
}
