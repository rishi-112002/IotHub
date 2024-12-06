import React, { CustomComponentPropsWithRef, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, StyleSheet, Animated } from 'react-native';
import fontSizes from '../../assets/fonts/FontSize';

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
  activeTintColor = 'blue',
  inactiveTintColor = 'gray',
}: CustomBottomTabNavigatorProps) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 140], // Adjust to control hide/show animation
    extrapolate: "clamp",
  });
  const headerTranslate = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -140], // Hide on scroll down
    extrapolate: "clamp",
  });
  const searBarTranslate = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200], // Hide on scroll down
    extrapolate: "clamp",
  });

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
          initialParams={{ scrollY, headerTranslate, searBarTranslate }}
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
    color: "black",
  },
  activeTabLabel: {
    color: "tomato",
    fontWeight: "bold",
  },
});


export default CustomBottomTabNavigator;