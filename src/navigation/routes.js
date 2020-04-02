import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { navigationRef, isMountedRef } from '~/navigation/RootNavigation';

// External
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

// Internal
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import SelectProvider from '~/pages/Appointment/SelectProvider';
import SelectDateTime from '~/pages/Appointment/SelectDateTime';
import Confirmation from '~/pages/Appointment/Confirmation';

import Colors from '~/styles/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// New appointment routes
function Appointment() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: Colors.light,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
      initialRouteName="SelectProvider"
    >
      <Stack.Screen
        options={({ navigation }) => ({
          title: 'Select one provider',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={24} color={Colors.light} />
            </TouchableOpacity>
          ),
        })}
        name="SelectProvider"
        component={SelectProvider}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          title: 'Select date and time',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color={Colors.light} />
            </TouchableOpacity>
          ),
        })}
        name="SelectDateTime"
        component={SelectDateTime}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          title: 'Confirm Appointment',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color={Colors.light} />
            </TouchableOpacity>
          ),
        })}
        name="Confirmation"
        component={Confirmation}
      />
    </Stack.Navigator>
  );
}

// Authenticated Routes
function Home() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: Colors.secondary,
        inactiveTintColor: Colors.light,
        style: { backgroundColor: '#0E1E40', borderTopColor: Colors.light },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Appointments',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <Icon name="event" size={20} color={color} />
          ),
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          unmountOnBlur: true,
          tabBarVisible: false,
          tabBarLabel: 'Book',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" size={20} color={color} />
          ),
        }}
        name="Appointment"
        component={Appointment}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

// Main Component

function Routes({ isSigned }) {
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isSigned ? 'Home' : 'SignIn'}
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isSigned ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

Routes.propTypes = {
  isSigned: PropTypes.bool.isRequired,
};

export default Routes;
