import React from 'react';
import HomeNavigation from './HomeNavigation';
import colors from '../assets/color/colors';
import CustomBottomTabNavigator from '../reuseableComponent/bottomTab/CustomBottomTab';
import DashBoard from '../screens/dashBoard/DashBoard';
import { ImagePath, Strings } from '../assets/constants/Lable';

const BottomTabNavigation = () => {
  const tabs = [
    {
      name: Strings.DASHBOARD,
      component: DashBoard,
      icon: ImagePath.DASHBOARD,
      focusedIcon: ImagePath.DASHBOARD,
      label: Strings.DASHBOARD,
    },
    {
      name: Strings.LIVE_SPOTS,
      component: HomeNavigation,
      icon: ImagePath.LIVE_SPOT,
      focusedIcon: ImagePath.LIVE_SPOT,
      label: Strings.SPOTS,
    },
  ];

  return (
    <CustomBottomTabNavigator

      initialRouteName={Strings.DASHBOARD}
      tabs={tabs}
      activeTintColor={colors.AppPrimaryColor}
      inactiveTintColor={colors.inactiveTint}
      tabBarStyle={{
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderTopColor: colors.DividerColor,
        elevation: 4,
      }}
    />
  );
};

export default BottomTabNavigation;
