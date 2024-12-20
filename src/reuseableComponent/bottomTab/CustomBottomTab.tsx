import React, { useContext, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, Animated } from 'react-native';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import { ScrollContext } from '../../contextApi/AnimationContext';
import { ContainerStyles } from '../../styles/ContainerStyles';

// Define the Tab Navigator
const Tab = createBottomTabNavigator();

interface TabConfig {
  name: string;
  component: React.ComponentType<any>;
  icon: any; // Path to the icon
  focusedIcon?: any; // Optional path to focused icon
  label?: string; // Optional custom label
}

interface CustomBottomTabNavigatorProps {
  initialRouteName: string;
  tabs: TabConfig[];
  tabBarStyle?: object;
  activeTintColor?: string;
  inactiveTintColor?: string;
}

function CustomBottomTabNavigator({
  initialRouteName,
  tabs,
  activeTintColor = colors.blueBase,
  inactiveTintColor = colors.gray,
}: CustomBottomTabNavigatorProps) {
  const { setScrollY, translateY } = useContext(
    ScrollContext,
  );
  const scrollY = useRef(new Animated.Value(0)).current;
  setScrollY(scrollY);
  const { containerStyles } = ContainerStyles();

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: [
          containerStyles.tabBarContainer,
          { transform: [{ translateY }] },
        ],
        tabBarIcon: ({ focused }) => {
          const currentTab = tabs.find(tab => tab.name === route.name);
          const iconSource = focused && currentTab?.focusedIcon
            ? currentTab.focusedIcon
            : currentTab?.icon;

          return (
            <View>
              <Image
                source={iconSource}
                style={{
                  tintColor: focused ? activeTintColor : inactiveTintColor,
                }}
              />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          const currentTab = tabs.find(tab => tab.name === route.name);
          return (
            <Text
              style={{
                fontSize: fontSizes.smallText,
                color: focused ? activeTintColor : inactiveTintColor,
              }}>
              {currentTab?.label || route.name}
            </Text>
          );
        },
      })}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};
export default CustomBottomTabNavigator;