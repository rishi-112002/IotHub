import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EventLogsScreen from '../screens/HomeScreen/EventLogsScreen';
import SpotListScreen from '../screens/SpotListScreen';
import SpotDetailScreen from '../screens/SpotDetails/SpotSDetailMainScreen';
import {AppNavigationParams} from './NavigationStackList';
import EditRfidScreen from '../screens/RFID/EditRfidscreen';

// Create the stack navigator with a parameterized type for AppNavigationParams
const Stack = createStackNavigator<AppNavigationParams>();

// Slide from right transition
export const slideFromRight = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [-0.5, 1],
              outputRange: [layouts.screen.width, 0],
              // easing: Easing.ease,
            }),
          },
        ],
      },
    };
  },
};

// Slide from left transition
export const slideFromLeft = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [-0.5, 1],
              outputRange: [-layouts.screen.width, 0], // Starts from the left
            }),
          },
        ],
      },
    };
  },
};

function HomeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      // screenOptions={({route}) => {
      //   if (route.name === 'SpotDetailScreen') {
      //     return slideFromRight;
      //   }
      //   return slideFromLeft;
      // }}
    >
      {/* Define the HomeScreen without a header */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      {/* Define the EventLogsScreen with a header shown */}
      <Stack.Screen
        name="EventLogScreen"
        component={EventLogsScreen}
        options={{headerShown: true}}
      />

      {/* Define the SpotListScreen with a header shown */}
      <Stack.Screen
        name="SpotDetailsScreen"
        component={SpotListScreen}
        // options={{headerShown: true}}
        options={slideFromRight}
        />

      {/* Define the SpotDetailScreen with custom slide animation */}
      <Stack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={slideFromRight}
        options={{headerShown: true}}
      />

      {/* Define the RfidEditScreen with a header shown */}
      <Stack.Screen
        name="RfidEdit"
        component={EditRfidScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
