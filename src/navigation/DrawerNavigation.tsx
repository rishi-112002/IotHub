import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import React from "react";
import CustomDrawerContent from "../reuseableComponent/drawer/CustomDrawer";
import HomeNavigation from './HomeNavigation';
import GenericNavigation from './GenericNavigation';
import WeighBridgeNavigation from './WeighBridgeNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppNavigationParams } from './NavigationStackList';
import RfidScreenNavigation from './RfidNavigation';

// Create the drawer navigator with a parameterized type for AppNavigationParams
const Drawer = createDrawerNavigator<AppNavigationParams>();

export default function DrawerNavigation() {
    // Use the 'useRoute' hook to access the current route and its parameters
    const route = useRoute<RouteProp<{ params: AppNavigationParams }, 'params'>>();
    
    // Destructure the 'screen' value from route parameters to set the initial route
    const { screen }: any = route.params;
    
    return (
        // Set up the Drawer Navigator
        <Drawer.Navigator 
            // Define the initial route based on the screen parameter passed in the route
            initialRouteName={screen} 
            
            // Disable the header for the screens (handled elsewhere)
            screenOptions={{ headerShown: false }}

            // Pass custom drawer content component for rendering the drawer menu
            drawerContent={() => <CustomDrawerContent />}
        >
            {/* Define the screens within the drawer navigation */}
            <Drawer.Screen name="HomeNavigation" component={HomeNavigation} />
            <Drawer.Screen name="Weighbridges" component={WeighBridgeNavigation} />
            <Drawer.Screen name="GenericSpot" component={GenericNavigation} />
            <Drawer.Screen name="RfidScreenNavigation" component={RfidScreenNavigation} />
        </Drawer.Navigator>
    );
}
