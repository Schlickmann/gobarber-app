import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import '~/config/ReactotronConfig';

import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from '~/contexts/UserContext';
// import { ScheduleProvider } from '~/contexts/ScheduleContext';
import App from './App';

export default function Index() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <UserProvider>
      <AuthProvider>
        <>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          <App />
        </>
      </AuthProvider>
    </UserProvider>
  );
}
