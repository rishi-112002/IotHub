import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventLogsScreen from '../screens/HomeScreen/EventLogsScreen';
import SpotDetailScreen from '../screens/SpotDetails/SpotSDetailMainScreen';
import SpotListScreen from '../screens/HomeScreen/SpotListScreen';
import { AppNavigationParams } from './NavigationStackList';
import WeighbridgesAddScreen from '../screens/weighBridge/WeighBridgeAddScreen';
import { slideFromRight } from './NavigationTransition';
import Weighbridges from '../screens/weighBridge/WeighbridgesScreen';
const Stack = createStackNavigator<AppNavigationParams>();
function WeighBridgeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...slideFromRight,
        headerShown: false,
      }}
      initialRouteName="WeighbridgesScreen">
      <Stack.Screen
        name="EventLogScreen"
        component={EventLogsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SpotDetailsScreen"
        component={SpotListScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="WeighbridgesScreen" component={Weighbridges} />
      <Stack.Screen
        name="WeighbridgesAddScreen"
        component={WeighbridgesAddScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
export default WeighBridgeNavigation;
