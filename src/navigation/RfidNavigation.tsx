import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RfidReader from '../screens/RFID/RFIDReaderScreen';
import RfidAddScreen from '../screens/RFID/AddRFIDScreen';
import {AppNavigationParams} from './NavigationStackList';
import EditRfidScreen from '../screens/RFID/EditRfidscreen';
const Stack = createStackNavigator<AppNavigationParams>();
function RfidScreenNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="RfidReader">
      <Stack.Screen
        name="RfidReader"
        component={RfidReader}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RFID ADD"
        component={RfidAddScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="RFID Edit"
        component={EditRfidScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}
export default RfidScreenNavigation;
