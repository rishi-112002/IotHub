import React, { useEffect, useRef } from 'react';
import HomeNavigation from './HomeNavigation';
import colors from '../assets/color/colors';
import CustomBottomTabNavigator from '../reuseableComponent/bottomTab/CustomBottomTab';
import { Colors2 } from '../assets/color/Colors2';
import DashBoard from '../screens/dashBoard/DashBoard';
import { Animated } from 'react-native';

const BottomTabNavigation = () => {

  const scrollY = useRef(new Animated.Value(0)).current;
  const offSetAnimation = useRef(new Animated.Value(0)).current;

  const CONTAINERHEiGHT = 60;
  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offSetAnimation,
    ),
    0,
    CONTAINERHEiGHT
  )
  let scrollEndTimer: any = null;
  const onMomnetumScrollBegin = () => {
    clearTimeout(scrollEndTimer)

  }
  const onMomnetumScrollEnd = () => {
    const toValue = _scrollValue > CONTAINERHEiGHT && _clampedScrollValue > CONTAINERHEiGHT / 2 ?
      _offsetValue + CONTAINERHEiGHT : _offsetValue - CONTAINERHEiGHT;
    Animated.timing(offSetAnimation, {
      toValue, duration: 500, useNativeDriver: true
    }).start();
  }
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomnetumScrollEnd, 250)
  }
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue * diff, 0),
        CONTAINERHEiGHT,
      )
    });
    offSetAnimation.addListener(({ value }) => {
      _offsetValue = value
    })
  }, [])
  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINERHEiGHT],
    outputRange: [0, -CONTAINERHEiGHT],
    extrapolate: "clamp"
  })

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
        transform: [{ translateY: headerTranslate }],
      }}
    />
  );
};

export default BottomTabNavigation;
