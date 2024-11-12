import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../assets/color/colors';
import CustomIcon from '../reuseableComponent/customIcons/CustomIcon';
import DashBoard from '../screens/dashBoard/DashBoard';
import { AppNavigationParams } from './NavigationStackList';
import HomeNavigation from './HomeNavigation';




// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator<AppNavigationParams>();

function BottomTabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="DashBoard"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.AppPrimaryColor,
                tabBarInactiveTintColor: colors.inactiveTint,
                tabBarStyle: {
                    elevation: 4,
                    shadowColor: colors.blueDarkest,
                    backgroundColor: colors.white,
                    height: 60,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'absolute',
                    overflow: 'hidden', // Ensures rounded corners are visible
                },
                tabBarIcon: ({ focused }) => {
                    let iconPath;

                    if (route.name === 'LiveSpots') {
                        iconPath = focused
                            ? require('../assets/icons/LiveSpots.png')
                            : require('../assets/icons/LiveSpots.png');
                    } else if (route.name === 'DashBoard') {
                        iconPath = focused
                            ? require('../assets/icons/dashBoard.png')
                            : require('../assets/icons/dashBoard.png');

                    }

                    return <CustomIcon iconPath={iconPath} onPress={undefined} style={{}} />;
                },
            })}
        >
            <Tab.Screen name="DashBoard" component={DashBoard} />
            <Tab.Screen name="LiveSpots" component={HomeNavigation} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigation;
