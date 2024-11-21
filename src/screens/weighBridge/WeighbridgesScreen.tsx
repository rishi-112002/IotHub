import { Animated, View, StyleSheet } from 'react-native';
import React from 'react';
import colors from '../../assets/color/colors';
import SpotsDataByTypeComponent from '../../component/listComp/SpotsDataByTypeComponent';
import WeighBridgeScreenHooks from '../../CustomHooks/weighBridgeHooks/WeighBridgeScreenHooks';
import FloatingActionCutomButton from '../../reuseableComponent/customButton/FloatingActionCustomButton';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import CustomLoader from '../../reuseableComponent/loader/CustomLoader';
import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';


function Weighbridges() {
  const {
    Loader,
    confirmDelete,
    handleDelete,
    isVisible,
    navigation,
    setIsVisible,
    spotsData,
    paddingTopAnimated,
    scrollY,
    translateButtonY,
    fadeAnim,
    translateY
  } = WeighBridgeScreenHooks();

  return (
    <View style={styles.container}>
      <CustomHeader
        buCode={undefined}
        userLogo={'account-circle'}
        title={'Weighbridges'}
        translateY={translateY}
        onSearchPress={undefined}
        onFilterPress={undefined}
        searchIcon={require("../../assets/icons/search.png")}
        filterIcon={require("../../assets/icons/filterMedium.png")} />
      {Loader ? (
        <CustomLoader />
      ) : (
        <Animated.View
          style={[styles.animatedContainer, { paddingTop: paddingTopAnimated }]}>
          <SpotsDataByTypeComponent
            data={spotsData}
            type={'UNIDIRECTIONAL_WEIGHBRIDGE'}
            handleScroll={(e: { nativeEvent: { contentOffset: { y: number } } }) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            handleDelete={handleDelete}
          />
          <FloatingActionCutomButton
            onPress={() => navigation.navigate('WeighbridgesAddScreen', { id: undefined })}
            translateButtonY={translateButtonY}
          />
        </Animated.View>
      )}

      {/* Animated CustomAlert */}
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
  animatedContainer: {
    position: 'relative',
    flex: 1,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Weighbridges;
