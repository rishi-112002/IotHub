import {createStackNavigator} from '@react-navigation/stack'; // Import the stack navigator from React Navigation
import React from 'react';
import EventLogsScreen from '../screens/HomeScreen/EventLogsScreen'; // Import the Event Logs screen component
import SpotListScreen from '../screens/HomeScreen/SpotListScreen'; // Import the Spot List screen component
import SpotDetailScreen from '../screens/SpotDetails/SpotSDetailMainScreen'; // Import the Spot Detail screen component (note: typo in file name "SpoptDetailScreen" should be corrected to "SpotDetailScreen")
import {AppNavigationParams} from './NavigationStackList'; // Import type definitions for navigation parameters
import GenericSpotAddScreen from '../screens/Generic/GenericSpotAddScreen';
import {slideFromRight} from './NavigationTransition';
import GenericSpot from '../screens/Generic/GenericSpotsScreen';

// Create the stack navigator with parameterized types for AppNavigationParams
const Stack = createStackNavigator<AppNavigationParams>();

function GenericNavigation() {
  return (
    // Define the stack navigator for generic navigation screens
    <Stack.Navigator screenOptions={slideFromRight}>
      {/* Screen for displaying the Generic Spot list; header is hidden */}
      <Stack.Screen
        name="GenericSpotScreen"
        component={GenericSpot}
        options={{headerShown: false}}
      />
      {/* Screen for displaying event logs; header is shown */}
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
      {/* Screen for displaying the list of spots; header is shown */}
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
      {/* Screen for displaying details of a specific spot; header is shown */}
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
      {/* Screen for adding a new generic spot; header is shown */}
      <Stack.Screen
        name="GenericSpotAddScreen"
        component={GenericSpotAddScreen}
        options={{
          headerStyle: {
            elevation: 0, // Removes shadow for Android
            shadowOpacity: 0, // Removes shadow for iOS
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default GenericNavigation;
