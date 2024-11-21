/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../assets/color/colors';
import { AppNavigationParams } from './NavigationStackList';
import HomeNavigation from './HomeNavigation';
import DashBoardNavigation from './DashBoardNavigation';
import { Colors2 } from '../assets/color/Colors2';
import { Image, View } from 'react-native';
import fontSizes from '../assets/fonts/FontSize';
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
                    borderWidth: 0.5,
                    borderTopColor: Colors2.DividerColor,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'absolute',
                    overflow: 'hidden', // Ensures rounded corners are visible
                },
                tabBarIcon: ({ focused }: any) => {
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
                    return (
                        <View>
                            <Image source={iconPath} style={{
                                tintColor: focused ? colors.AppPrimaryColor : colors.inactiveTint,
                            }} />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="DashBoard" component={DashBoardNavigation} options={{

                tabBarLabelStyle: {
                    fontSize: fontSizes.text,
                },
            }} />
            <Tab.Screen name="LiveSpots" component={HomeNavigation} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigation;
