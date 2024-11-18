import React from 'react';
// import {Easing} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EventLogsScreen from '../screens/HomeScreen/EventLogsScreen';
import SpotListScreen from '../screens/SpotListScreen';
import SpotDetailScreen from '../screens/SpotDetails/SpotSDetailMainScreen';
import {AppNavigationParams} from './NavigationStackList';
import EditRfidScreen from '../screens/RFID/EditRfidscreen';
import {slideFromRight} from './NavigationTransition';
import { useRoute, RouteProp } from '@react-navigation/native';
type conectivityParams = {types: any; screen: any};
const Stack = createStackNavigator<AppNavigationParams>();


function HomeNavigation() {
  const route = useRoute<RouteProp<{params: conectivityParams}, 'params'>>();
  const conectivityType = route.params?.types || '';
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={slideFromRight}
      // screenOptions={({route}) => {
      //   if (route.name === 'SpotDetailScreen') {
      //     return slideFromRight;
      //   }
      //   return slideFromRight;
      // }}
    >
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
        options={{headerShown: true}}
      />

      {/* Define the SpotListScreen with a header shown */}
      <Stack.Screen
        name="SpotDetailsScreen"
        component={SpotListScreen}
        // options={{headerShown: true}}
        // options={{animation: slideFromRight}}
      />

      {/* Define the SpotDetailScreen with custom slide animation */}
      <Stack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        // options={slideFromRight}
        // options={{headerShown: true}}
      />

      {/* Define the RfidEditScreen with a header shown */}
      <Stack.Screen
        name="RfidEdit"
        component={EditRfidScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
