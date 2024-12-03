<<<<<<< HEAD
import React, {  } from 'react';
=======
import React from 'react';
>>>>>>> 19f18b667827c4f5ebbb2460a1410a43c5cf0901
import HomeNavigation from './HomeNavigation';
import colors from '../assets/color/colors';
import CustomBottomTabNavigator from '../reuseableComponent/bottomTab/CustomBottomTab';
import { Colors2 } from '../assets/color/Colors2';
import DashBoard from '../screens/dashBoard/DashBoard';

const BottomTabNavigation = () => {

<<<<<<< HEAD

=======
>>>>>>> 19f18b667827c4f5ebbb2460a1410a43c5cf0901
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
      label: 'Live Spots',
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
