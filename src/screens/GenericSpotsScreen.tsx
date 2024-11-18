import { ActivityIndicator, Animated, View, StyleSheet } from 'react-native';
import SpotsDataByTypeComponent from '../component/SpotsDataByTypeComponent';
import FloatingActionCutomButton from '../reuseableComponent/customButton/FloatingActionCustomButton';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import React, {  } from 'react';
import colors from '../assets/color/colors';
import GenericScreenHooks from '../CustomHooks/genericHooks/GenericScreenHooks';
import CustomAlert from '../reuseableComponent/PopUp/CustomPopUp';

function GenericSpot() {

  const {
    Loader,
    confirmDelete,
    handleDelete,
    isVisible,
    setIsVisible,
    onHandlePress,
    translateY,
    paddingTopAnimated,
    scrollY,
    spotsData,
    translateButtonY,
    fadeAnim
  } = GenericScreenHooks();
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
          style={[styles.contentContainer, { paddingTop: paddingTopAnimated }]}>
          <SpotsDataByTypeComponent
            data={spotsData}
            type={'GENERIC_SPOT'}
            handleScroll={(e: { nativeEvent: { contentOffset: { y: number } } }) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            handleDelete={handleDelete}
          />
          <FloatingActionCutomButton
            onPress={onHandlePress}
            translateButtonY={translateButtonY}
          />
        </Animated.View>
      )}
      {isVisible && (
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
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
    backgroundColor: colors.white,
  },
  loader: {
    flex: 1,
  },
  contentContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.white,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GenericSpot;
