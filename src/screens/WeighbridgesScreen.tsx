import { Animated, View, StyleSheet } from 'react-native';
import SpotsDataByTypeComponent from '../component/SpotsDataByTypeComponent';
import FloatingActionCutomButton from '../reuseableComponent/customButton/FloatingActionCustomButton';
import CustomLoader from '../reuseableComponent/loader/CustomLoader';
import colors from '../assets/color/colors';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import React from 'react';
import CustomAlert from '../reuseableComponent/PopUp/CustomPopUp';
import WeighBridgeScreenHooks from '../CustomHooks/weighBridgeHooks/WeighBridgeScreenHooks';

function Weighbridges() {
  const {
    Loader,
    WeighbridgeSpots,
    confirmDelete,
    handleDelete,
    isVisible,
    navigation,
    setIsVisible,
  } = WeighBridgeScreenHooks();

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 60);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });
  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 0],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });
  const translateButtonY = diffClamp.interpolate({
    inputRange: [0, 0],
    outputRange: [0, 100],
  });

  if (WeighbridgeSpots) {
    console.log('Generic Spots ', WeighbridgeSpots);
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        buCode={undefined}
        userLogo={'account-circle'}
        title={'Weighbridges'}
        translateY={translateY}
      />
      {Loader ? (
        <CustomLoader />
      ) : (
        <Animated.View
          style={[
            styles.animatedContainer,
            { paddingTop: paddingTopAnimated },
          ]}
        >
          <SpotsDataByTypeComponent
            data={WeighbridgeSpots}
            type={'UNIDIRECTIONAL_WEIGHBRIDGE'}
            handleScroll={(e: { nativeEvent: { contentOffset: { y: number } } }) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            handleDelete={handleDelete}
          />
          <FloatingActionCutomButton
            onPress={() => navigation.navigate('WeighbridgesAddScreen')}
            translateButtonY={translateButtonY}
          />
        </Animated.View>
      )}
      <CustomAlert
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onOkPress={confirmDelete}
        title="GENERIC_SPOT"
        message="Are you sure you want to delete this GENERIC_SPOT?"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  animatedContainer: {
    position: 'relative',
    flex: 1,
  },
});

export default Weighbridges;
