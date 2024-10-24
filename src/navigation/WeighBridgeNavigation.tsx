import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventLogsScreen from "../screens/HomeScreen/EventLogsScreen";
import SpotDetailScreen from "../screens/SpoptDetailScreen";
import SpotListScreen from "../screens/SpotListScreen";
import Weighbridges from "../screens/WeighbridgesScreen";
import { AppNavigationParams } from "./NavigationStackList";
import WeighbridgesAddScreen from "../screens/weighBridgeAdd/WeighBridgeAddScreen";
const Stack = createStackNavigator<AppNavigationParams>();
function WeighBridgeNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EventLogScreen" component={EventLogsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="SpotDetailsScreen" component={SpotListScreen} options={{ headerShown: true }} />
            <Stack.Screen name="SpotDetailScreen" component={SpotDetailScreen} options={{ headerShown: true }} />
            <Stack.Screen name="WeighbridgesScreen" component={Weighbridges} />
            <Stack.Screen
                name="WeighbridgesAddScreen"
                component={WeighbridgesAddScreen}
                options={{ headerShown: true }} // Add title here
            />
        </Stack.Navigator>
    )
}
export default WeighBridgeNavigation;