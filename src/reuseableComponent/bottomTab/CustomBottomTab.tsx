import React, { CustomComponentPropsWithRef, useContext, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, StyleSheet, Animated } from 'react-native';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import { ScrollContext } from '../../contextApi/AnimationContext';

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
  const { setScrollY ,translateY} = useContext(
    ScrollContext,
  );
  const scrollY = useRef(new Animated.Value(0)).current;
  setScrollY(scrollY);
  

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: [
          styles.tabBarContainer,
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
const styles = StyleSheet.create({
  tabBarContainer: {
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    overflow: 'hidden',
  },
  tabLabel: {
    fontSize: 14,
    color: colors.darkblack,
  },
  activeTabLabel: {
    color: colors.redBase,
    fontWeight: "bold",
  },
});


export default CustomBottomTabNavigator;