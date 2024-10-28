import {ActivityIndicator, Animated, View, StyleSheet} from 'react-native';
import SpotsDataByTypeComponent from '../component/SpotsDataByTypeComponent';
import FloatingActionCutomButton from '../reuseableComponent/customButton/FloatingActionCustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import {AppNavigationParams} from '../navigation/NavigationStackList';
import React from 'react';
import colors from '../assets/color/colors';
import GenericScreenHooks from '../CustomHooks/genericHooks/GenericScreenHooks';
import CustomAlert from '../reuseableComponent/PopUp/CustomPopUp';

function GenericSpot() {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 60);
  const {
    Loader,
    GenericSpots,
    confirmDelete,
    handleDelete,
    isVisible,
    setIsVisible,
  } = GenericScreenHooks();
  const onHandlePress = () => {
    navigation.navigate('GenericSpotAddScreen');
  };

  const translateY = diffClamp.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });
  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 0],
    outputRange: [60, 0],
    extrapolate: 'clamp', // Ensures the value doesn't exceed the input range
  });
  const translateButtonY = diffClamp.interpolate({
    inputRange: [0, 0],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.container}>
      <CustomHeader
        buCode={undefined}
        userLogo={'account-circle'}
        title={'GenericSpot'}
        translateY={translateY}
      />

      {Loader ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <Animated.View
          style={[styles.contentContainer, {paddingTop: paddingTopAnimated}]}>
          <SpotsDataByTypeComponent
            data={GenericSpots}
            type={'GENERIC_SPOT'}
            handleScroll={(e: {nativeEvent: {contentOffset: {y: number}}}) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            handleDelete={handleDelete}
          />
          <FloatingActionCutomButton
            onPress={onHandlePress}
            translateButtonY={translateButtonY}
          />
          <CustomAlert
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            onOkPress={confirmDelete}
            title="GENERIC_SPOT"
            message="Are you sure you want to delete this GENERIC_SPOT?"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
  },
  contentContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default GenericSpot;
