import { createStackNavigator } from "@react-navigation/stack"; // Import the stack navigator from React Navigation
import React from "react";
import EventLogsScreen from "../screens/HomeScreen/EventLogsScreen"; // Import the Event Logs screen component
import SpotListScreen from "../screens/SpotListScreen"; // Import the Spot List screen component
import SpotDetailScreen from "../screens/SpoptDetailScreen"; // Import the Spot Detail screen component (note: typo in file name "SpoptDetailScreen" should be corrected to "SpotDetailScreen")
import GenericSpot from "../screens/GenericSpotsScreen"; // Import the Generic Spots screen component
import GenericSpotAddScreen from "../screens/GenericSpotAddScreen"; // Import the Generic Spot Add screen component
import { AppNavigationParams } from "./NavigationStackList"; // Import type definitions for navigation parameters

// Create the stack navigator with parameterized types for AppNavigationParams
const Stack = createStackNavigator<AppNavigationParams>();

function GenericNavigation() {
    return (
        // Define the stack navigator for generic navigation screens
        <Stack.Navigator>
            {/* Screen for displaying the Generic Spot list; header is hidden */}
            <Stack.Screen
                name="GenericSpotScreen"
                component={GenericSpot}
                options={{ headerShown: false }}
            />
            {/* Screen for displaying event logs; header is shown */}
            <Stack.Screen
                name="EventLogScreen"
                component={EventLogsScreen}
                options={{ headerShown: true }}
            />
            {/* Screen for displaying the list of spots; header is shown */}
            <Stack.Screen
                name="SpotDetailsScreen"
                component={SpotListScreen}
                options={{ headerShown: true }}
            />
            {/* Screen for displaying details of a specific spot; header is shown */}
            <Stack.Screen
                name="SpotDetailScreen"
                component={SpotDetailScreen}
                options={{ headerShown: true }}
            />
            {/* Screen for adding a new generic spot; header is shown */}
            <Stack.Screen
                name="GenericSpotAddScreen"
                component={GenericSpotAddScreen}
                options={{ headerShown: true}}
            />
        </Stack.Navigator>
    );
}

export default GenericNavigation;
