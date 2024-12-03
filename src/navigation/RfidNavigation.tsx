import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RfidReader from '../screens/RFID/RFIDReaderScreen';
import RfidAddScreen from '../screens/RFID/AddRFIDScreen';
import { AppNavigationParams } from './NavigationStackList';
import EditRfidScreen from '../screens/RFID/EditRfidscreen';
import { slideFromRight } from './NavigationTransition';
const Stack = createStackNavigator<AppNavigationParams>();
function RfidScreenNavigation() {
  return (
    <Stack.Navigator
      screenOptions={slideFromRight}
      initialRouteName="RfidReader">
      <Stack.Screen
        name="RfidReader"
        component={RfidReader}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RfidAdd"
        component={RfidAddScreen}
        options={{
          headerStyle: {
            elevation: 0, // Removes shadow for Android
            shadowOpacity: 0, // Removes shadow for iOS
          },
        }}
      />
      <Stack.Screen
        name="RfidEdit"
        component={EditRfidScreen}
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
export default RfidScreenNavigation;
