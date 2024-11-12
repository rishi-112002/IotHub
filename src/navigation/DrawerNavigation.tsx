/* eslint-disable react/no-unstable-nested-components */
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../reuseableComponent/drawer/CustomDrawer';
import GenericNavigation from './GenericNavigation';
import WeighBridgeNavigation from './WeighBridgeNavigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigationParams } from './NavigationStackList';
import RfidScreenNavigation from './RfidNavigation';
import BottomTabNavigation from './BottomTab';

const Drawer = createDrawerNavigator<AppNavigationParams>();
export default function DrawerNavigation() {
  const route = useRoute<RouteProp<{ params: AppNavigationParams }, 'params'>>();
  const { screen }: any = route.params;
  console.log("screen name ", screen)
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName={"bottomTabNavigation"}
      screenOptions={{ headerShown: false }}
      drawerContent={() => <CustomDrawerContent navigation={navigation } />}>
      <Drawer.Screen name="bottomTabNavigation" component={BottomTabNavigation} />
      <Drawer.Screen name="Weighbridges" component={WeighBridgeNavigation} />
      <Drawer.Screen name="GenericSpot" component={GenericNavigation} />
      <Drawer.Screen name="RfidScreenNavigation" component={RfidScreenNavigation} />

    </Drawer.Navigator>
  );
}