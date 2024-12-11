import { View, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import SplashEffect from './SplashEffect';
import SplashStyle from './SplashStyle';
import React from 'react';
import colors from '../../../assets/color/colors';

function SplashScreen() {
  const { ring1Style, ring2Style, logoStyle } = SplashEffect();
  const { styles } = SplashStyle();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.HelperTextColor}
        networkActivityIndicatorVisible={true}
        barStyle={'default'} />
      <Animated.View style={[styles.ringContainer, ring2Style]}>
        <Animated.View style={[styles.ringContainer, ring1Style]}>
          <Animated.Image
            source={require("../../../assets/images/apconicLogo.png")}
            style={[styles.logo, logoStyle]}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default SplashScreen;
