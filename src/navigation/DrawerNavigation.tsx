import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import CustomDrawerContent from "../reuseableComponent/drawer/CustomDrawer";
import Weighbridges from "../screens/WeighbridgesScreen";
import GenericSpot from "../screens/GenericSpotsScreen";
import HomeNavigation from './HomeNavigation';
import GenericSpotAddScreen from '../screens/GenericSpotAddScreen';

const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
    return (

        <Drawer.Navigator initialRouteName="LiveSpot" screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="LiveSpot" component={HomeNavigation} />
            <Drawer.Screen name="Weighbridges" component={Weighbridges} />
            <Drawer.Screen name="GenericSpot" component={GenericSpot} />
            <Drawer.Screen name="GenericSpotAddScreen" component={GenericSpotAddScreen} />
        </Drawer.Navigator>

    );
}