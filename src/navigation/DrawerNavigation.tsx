import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import React from "react";
import CustomDrawerContent from "../reuseableComponent/drawer/CustomDrawer";
import HomeNavigation from './HomeNavigation';
import GenericNavigation from './GenericNavigation';
import WeighBridgeNavigation from './WeighBridgeNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppNavigationParams } from './NavigationStackList';

const Drawer = createDrawerNavigator<AppNavigationParams>();
export default function DrawerNavigation() {
    const route = useRoute<RouteProp<{ params: AppNavigationParams }, 'params'>>();
    const { screen }: any = route.params;
    return (

        <Drawer.Navigator initialRouteName={screen} screenOptions={{ headerShown: false }}
            drawerContent={() => <CustomDrawerContent />}>
            <Drawer.Screen name="LiveSpot" component={HomeNavigation} />
            <Drawer.Screen name="Weighbridges" component={WeighBridgeNavigation} />
            <Drawer.Screen name="GenericSpot" component={GenericNavigation} />
        </Drawer.Navigator>

    );
}