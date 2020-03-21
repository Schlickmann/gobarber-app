import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Routes from '~/routes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <Routes />
    </>
  );
}
