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
        headerShown: true,
      }}
      initialRouteName="WeighbridgesScreen">
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
      <Stack.Screen name="WeighbridgesScreen" component={Weighbridges} 
      options={{ headerShown: false}}/>
      <Stack.Screen
        name="WeighbridgesAddScreen"
        component={WeighbridgesAddScreen}
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
export default WeighBridgeNavigation;
