/* eslint-disable react/no-unstable-nested-components */
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../reuseableComponent/drawer/CustomDrawer';
import GenericNavigation from './GenericNavigation';
import WeighBridgeNavigation from './WeighBridgeNavigation';
// import { useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from './NavigationStackList';
import RfidScreenNavigation from './RfidNavigation';
import BottomTabNavigation from './BottomTab';
import HomeNavigation from './HomeNavigation';
import AllEventLogsScreen from '../screens/dashBoard/AllEventLogScreen';

const Drawer = createDrawerNavigator<AppNavigationParams>();
export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName={'bottomTabNavigation'}
      screenOptions={{ headerShown: true }}
      drawerContent={() => <CustomDrawerContent />}>
{/* <<<<<<< HEAD */}
      <Drawer.Screen name="bottomTabNavigation" component={BottomTabNavigation}  options={{headerShown:false}} />
      <Drawer.Screen name="WeighBridgeNavigation" component={WeighBridgeNavigation} options={{headerShown:false}}  />
      <Drawer.Screen name="GenericSpotNavigation" component={GenericNavigation}  options={{headerShown:false}} />
      <Drawer.Screen name="RfidScreenNavigation" component={RfidScreenNavigation}
       options={{headerShown:false}} />
      <Drawer.Screen name="LiveSpots" component={HomeNavigation}  options={{headerShown:false}}/>

{/* ======= */}
      {/* <Drawer.Screen name="bottomTabNavigation" component={BottomTabNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name="WeighBridgeNavigation" component={WeighBridgeNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name="GenericSpotNavigation" component={GenericNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name="RfidScreenNavigation" component={RfidScreenNavigation}
        options={{ headerShown: false }} />
      <Drawer.Screen name="LiveSpots" component={HomeNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name="AllEventLogsScreen" component={AllEventLogsScreen}
        options={{ headerShown: false }} /> */}
{/* >>>>>>> 3b12c3e38f8b6699fe219c4a411b6c28c318353e */}
    </Drawer.Navigator>
  );
}
