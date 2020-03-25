import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';

import Colors from '~/styles/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Test" component={Dashboard} />
    </Tab.Navigator>
  );
}

function Routes({ isSigned }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isSigned ? 'Home' : 'SignIn'}
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
        <Stack.Screen
          options={{ header: () => null }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

Routes.propTypes = {
  isSigned: PropTypes.bool.isRequired,
};

export default Routes;
