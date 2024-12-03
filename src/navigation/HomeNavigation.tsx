import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EventLogsScreen from '../screens/HomeScreen/EventLogsScreen';
import SpotListScreen from '../screens/HomeScreen/SpotListScreen';
import SpotDetailScreen from '../screens/SpotDetails/SpotSDetailMainScreen';
import { AppNavigationParams } from './NavigationStackList';
import EditRfidScreen from '../screens/RFID/EditRfidscreen';
import { slideFromRight } from './NavigationTransition';

const Stack = createStackNavigator<AppNavigationParams>();


function HomeNavigation({ route }: { route: any }) {
  const { scrollY, headerTranslate } = route.params;
  console.log("scrolly in navigation", scrollY, headerTranslate)
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={slideFromRight}
    >
      {/* Define the HomeScreen without a header */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ scrollY, headerTranslate }}
      />

      {/* Define the EventLogsScreen with a header shown */}
      <Stack.Screen
        name="EventLogScreen"
        component={EventLogsScreen}
        options={{
          headerStyle: {
            elevation: 0, // Removes shadow for Android
            shadowOpacity: 0, // Removes shadow for iOS
          },
        }}
      />

      {/* Define the SpotListScreen with a header shown */}
      <Stack.Screen
        name="SpotDetailsScreen"
        component={SpotListScreen}
        options={{
          headerStyle: {
            elevation: 0, // Removes shadow for Android
            shadowOpacity: 0, // Removes shadow for iOS
          },
        }}
      />

      {/* Define the SpotDetailScreen with custom slide animation */}
      <Stack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={{
          headerStyle: {
            elevation: 0, // Removes shadow for Android
            shadowOpacity: 0, // Removes shadow for iOS
          },
        }}
      />

      {/* Define the RfidEditScreen with a header shown */}
      <Stack.Screen
        name="RfidEdit"
        component={EditRfidScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
