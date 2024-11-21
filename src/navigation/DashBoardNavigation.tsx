import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppNavigationParams } from './NavigationStackList';
import DashBoard from '../screens/dashBoard/DashBoard';
import AllEventLogsScreen from '../screens/dashBoard/AllEventLogScreen';

const Stack = createStackNavigator<AppNavigationParams>();

function DashBoardNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DashBoardScreen"
                component={DashBoard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AllEventLogsScreen" component={AllEventLogsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default DashBoardNavigation;
