import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import React from "react";
import CustomDrawerContent from "../reuseableComponent/drawer/CustomDrawer";
import HomeNavigation from './HomeNavigation';
import GenericNavigation from './GenericNavigation';
import WeighBridgeNavigation from './WeighBridgeNavigation';

export type RootDrawerTypes = {
    navigate(arg0: string): void;
    LiveSpot: undefined;
    Weighbridges: { screen: string };
    GenericSpot: { screen: string };
    GenericSpotAddScreen: undefined;
    SpotDetailScreen: { data: [], onPress: any }
};

const Drawer = createDrawerNavigator<RootDrawerTypes>();
export default function DrawerNavigation() {
    return (

        <Drawer.Navigator initialRouteName="LiveSpot" screenOptions={{ headerShown: false }}
            drawerContent={() => <CustomDrawerContent />}>
            <Drawer.Screen name="LiveSpot" component={HomeNavigation} />
            <Drawer.Screen name="Weighbridges" component={WeighBridgeNavigation} />
            <Drawer.Screen name="GenericSpot" component={GenericNavigation} />
        </Drawer.Navigator>

    );
}