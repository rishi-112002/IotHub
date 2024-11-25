import SplashScreen from '../screens/authScreen/splash/SplashScreen';
import UrlScreen from '../screens/authScreen/url/UrlScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import { AppNavigationParams } from './NavigationStackList';
import React from 'react';
import LoginForm from '../screens/authScreen/login/LoginForm';
import AppNavigationHooks from '../CustomHooks/navigationHook/AppNavigationHook';

const Stack = createStackNavigator<AppNavigationParams>();

function AppNavigation() {
  const { loading } = AppNavigationHooks();

  // Display the splash screen while loading
  // console.log('Loading state of login', loading, userName);
  if (loading) {
    return <SplashScreen />;
  }
  // Render the navigation stack
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      {/* If user is not logged in, show UrlScreen and LoginScreen */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UrlScreen"
        component={UrlScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginForm}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
