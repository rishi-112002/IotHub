import { View, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import SplashEffect from './SplashEffect';
import {STYLES} from '../../../styles/ScreensStyles'
import React from 'react';
import colors from '../../../assets/color/colors';

function SplashScreen() {
  const { ring1Style, ring2Style, logoStyle } = SplashEffect();
  return (
    <View style={STYLES.Splash_container}>
      <StatusBar backgroundColor={colors.HelperTextColor}
        networkActivityIndicatorVisible={true}
        barStyle={'default'} />
      <Animated.View style={[STYLES.Splash_ringContainer, ring2Style]}>
        <Animated.View style={[STYLES.Splash_ringContainer, ring1Style]}>
          <Animated.Image
            source={require("../../../assets/images/apconicLogo.png")}
            style={[STYLES.Splash_logo, logoStyle]}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default SplashScreen;
