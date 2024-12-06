import React, { } from 'react';
import HomeNavigation from './HomeNavigation';
import colors from '../assets/color/colors';
import CustomBottomTabNavigator from '../reuseableComponent/bottomTab/CustomBottomTab';
import { Colors2 } from '../assets/color/Colors2';
import DashBoard from '../screens/dashBoard/DashBoard';

const BottomTabNavigation = () => {

  const tabs = [
    {
      name: 'DashBoard',
      component: DashBoard,
      icon: require('../assets/icons/dashBoard.png'),
      focusedIcon: require('../assets/icons/dashBoard.png'),
      label: 'Dashboard',
    },
    {
      name: 'LiveSpots',
      component: HomeNavigation,
      icon: require('../assets/icons/LiveSpots.png'),
      focusedIcon: require('../assets/icons/LiveSpots.png'),
      label: 'Spots',
    },
  ];

  return (
    <CustomBottomTabNavigator

      initialRouteName="DashBoard"
      tabs={tabs}
      activeTintColor={colors.AppPrimaryColor}
      inactiveTintColor={colors.inactiveTint}
      tabBarStyle={{
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderTopColor: Colors2.DividerColor,
        elevation: 4,
      }}
    />
  );
};

export default BottomTabNavigation;
