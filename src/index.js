import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from '~/contexts/UserContext';
// import { ScheduleProvider } from '~/contexts/ScheduleContext';
import Routes from '~/routes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <UserProvider>
      <AuthProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <Routes />
      </AuthProvider>
    </UserProvider>
  );
}
