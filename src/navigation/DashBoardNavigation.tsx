import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppNavigationParams } from './NavigationStackList';
import DashBoard from '../screens/dashBoard/DashBoard';
import AllEventLogsScreen from '../screens/dashBoard/AllEventLogScreen';

// Create the stack navigator with a parameterized type for AppNavigationParams
const Stack = createStackNavigator<AppNavigationParams>();

function DashBoardNavigation() {
    return (
        // Set up the Stack Navigator
        <Stack.Navigator>
            {/* Define the HomeScreen without a header */}
            <Stack.Screen
                name="DashBoard"
                component={DashBoard}
                options={{ headerShown: false }}
            />
            {/* Define the EventLogsScreen with a header shown */}
            <Stack.Screen
                name="AllEventLogsScreen" component={AllEventLogsScreen}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="WeighBridgeNavigation" 
            component={WeighBridgeNavigation} options={{ headerShown: false }} /> */}


            {/* Define the SpotListScreen with a header shown */}
        </Stack.Navigator>
    );
}

export default DashBoardNavigation;
