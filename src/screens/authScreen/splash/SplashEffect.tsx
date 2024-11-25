/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState} from 'react';
import {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppNavigationParams} from '../../../navigation/NavigationStackList';
import {RootState} from '../../../reducer/Store';
import NetInfo from '@react-native-community/netinfo';
import {useNetwork} from '../../../contextApi/NetworkContex';

function SplashEffect() {
  const {isConnected} = useNetwork();
  const userName = useSelector(
    (state: RootState) => state.authentication.userName,
  );
  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );

  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const ring1Scale = useSharedValue(0);
  const ring2Scale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

  // const netinfo = async () => {
  //   const netInfo = await NetInfo.fetch();
  //   if (!netInfo.isConnected) {
  //     Alert.alert(
  //       'No Internet Connection',
  //       'Please check your internet connection and try again.',
  //     );
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   netinfo();
  // }, [netinfo]);

  useEffect(() => {
    if (isFirstLaunch) {
      // Animate ring 1
      setTimeout(() => {
        ring1Scale.value = withTiming(1.2, {
          duration: 800,
          easing: Easing.out(Easing.exp),
        });
      }, 150);

      // Animate ring 2 and logo
      setTimeout(() => {
        ring2Scale.value = withTiming(1.5, {
          duration: 1000,
          easing: Easing.out(Easing.exp),
        });
        logoOpacity.value = withTiming(1, {duration: 500});
      }, 400);

      // Handle navigation logic and connectivity
      const splashTimeout = setTimeout(() => {
        if (isConnected) {
          if (baseUrls) {
            if (userName) {
              navigation.navigate('Drawer', {screen: 'bottomTabNavigation'});
            } else {
              navigation.navigate('LoginScreen');
            }
          } else {
            navigation.navigate('UrlScreen', {baseUrls});
          }
        }
        setIsFirstLaunch(false);
      }, 2000);

      // Cleanup timeout on unmount
      return () => clearTimeout(splashTimeout);
    }
  }, [
    baseUrls,
    userName,
    navigation,
    ring1Scale,
    ring2Scale,
    logoOpacity,
    isFirstLaunch,
    isConnected,
  ]);

  const ring1Style = useAnimatedStyle(() => ({
    transform: [{scale: ring1Scale.value}],
  }));
  const ring2Style = useAnimatedStyle(() => ({
    transform: [{scale: ring2Scale.value}],
  }));
  const logoStyle = useAnimatedStyle(() => ({opacity: logoOpacity.value}));

  return isFirstLaunch
    ? {ring1Style, ring2Style, logoStyle}
    : {ring1Style: {}, ring2Style: {}, logoStyle: {}};
}
export default SplashEffect;
