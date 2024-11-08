import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../assets/color/colors';
import CustomIcon from '../reuseableComponent/customIcons/CustomIcon';
import DashBoard from '../screens/dashBoard/DashBoard';
import DrawerNavigation from './DrawerNavigation';


type TabParamList = {
    DashBoard: undefined;
    LiveSpot: undefined;
};

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator<TabParamList>();

function BottomTabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="DashBoard"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
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

                    if (route.name === 'LiveSpot') {
                        iconPath = focused
                            ? require('../assets/icons/editIcon.png')
                            : require('../assets/icons/editIcon.png');
                    } else if (route.name === 'DashBoard') {
                        iconPath = focused
                            ? require('../assets/icons/editIcon.png')
                            : require('../assets/icons/editIcon.png');
                    }

                    return <CustomIcon iconPath={iconPath} onPress={undefined} />;
                },
            })}
        >
            <Tab.Screen name="DashBoard" component={DashBoard} />
            <Tab.Screen name="LiveSpot" component={DrawerNavigation} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigation;
