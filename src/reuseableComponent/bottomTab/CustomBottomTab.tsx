import React, { CustomComponentPropsWithRef } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, Text, StyleSheet} from 'react-native';

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

function CustomBottomTabNavigator ({
  initialRouteName,
  tabs,
  tabBarStyle,
  activeTintColor = 'blue',
  inactiveTintColor = 'gray',
}:CustomBottomTabNavigatorProps)  {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          overflow: 'hidden',
          ...tabBarStyle,
        },
        tabBarIcon: ({focused}) => {
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
        tabBarLabel: ({focused}) => {
          const currentTab = tabs.find(tab => tab.name === route.name);
          return (
            <Text
              style={{
                fontSize: 12,
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
