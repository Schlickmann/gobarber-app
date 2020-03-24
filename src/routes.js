import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { authContext } from '~/contexts/AuthContext';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';

import Colors from '~/styles/colors';

const Stack = createStackNavigator();

function Routes() {
  const { signed } = useContext(authContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.secondary,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        {!signed ? (
          <>
            <Stack.Screen
              options={{ header: () => null }}
              name="SignIn"
              component={SignIn}
            />
            <Stack.Screen
              options={{ header: () => null }}
              name="SignUp"
              component={SignUp}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ header: () => null }}
            name="Dashboard"
            component={Dashboard}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
