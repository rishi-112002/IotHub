import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import EventLogsScreen from "../screens/EventLogsScreen";
import SpotListScreen from "../screens/SpotListScreen";
import SpotDetailScreen from "../screens/SpoptDetailScreen"; // Note: There's a typo in the import name ("SpoptDetailScreen" should be "SpotDetailScreen").
import { AppNavigationParams } from "./NavigationStackList";

// Create the stack navigator with a parameterized type for AppNavigationParams
const Stack = createStackNavigator<AppNavigationParams>();

function HomeNavigation() {
    return (
        // Set up the Stack Navigator
        <Stack.Navigator>
            {/* Define the HomeScreen without a header */}
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{ headerShown: false }} 
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
        </Stack.Navigator>
    )
}

export default HomeNavigation;
