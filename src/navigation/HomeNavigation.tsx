import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EventLogsScreen from '../screens/HomeScreen/EventLogsScreen';
import SpotListScreen from '../screens/SpotListScreen';
import SpotDetailScreen from '../screens/SpotDetails/SpotSDetailMainScreen';
import { AppNavigationParams } from './NavigationStackList';
import EditRfidScreen from '../screens/RFID/EditRfidscreen';
import { useRoute, RouteProp } from '@react-navigation/native';

// Create the stack navigator with a parameterized type for AppNavigationParams
const Stack = createStackNavigator<AppNavigationParams>();
type conectivityParams = { types: any, screen: any }

function HomeNavigation() {
  const route = useRoute<RouteProp<{ params: conectivityParams }, 'params'>>();
  const conectivityType = route.params?.types || '';
  console.log("conectivityType", conectivityType, route)
  return (
    // Set up the Stack Navigator
    <Stack.Navigator>
      {/* Define the HomeScreen without a header */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ conectivityType }}
      />
      {/* Define the EventLogsScreen with a header shown */}
      <Stack.Screen
        name="EventLogScreen"
        component={EventLogsScreen}
        options={{ headerShown: true }}
      />
      {/* Define the SpotListScreen with a header shown */}
      <Stack.Screen
        name="SpotDetailsScreen"
        component={SpotListScreen}
        options={{ headerShown: true }}
      />
      {/* Define the SpotDetailScreen with a header shown */}
      <Stack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="RfidEdit"
        component={EditRfidScreen}
        options={{ headerShown: true }}
      />

    </Stack.Navigator>
  );
}

export default HomeNavigation;
