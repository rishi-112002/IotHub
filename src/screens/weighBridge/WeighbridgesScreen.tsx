import { Animated, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import colors from '../../assets/color/colors';
import SpotsDataByTypeComponent from '../../component/listComp/SpotsDataByTypeComponent';
import WeighBridgeScreenHooks from '../../CustomHooks/weighBridgeHooks/WeighBridgeScreenHooks';
import FloatingActionCutomButton from '../../reuseableComponent/customButton/FloatingActionCustomButton';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import CustomLoader from '../../reuseableComponent/loader/CustomLoader';
import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter';
import FilterModal from '../../reuseableComponent/Filter/FilterModle';
import ScrollableBadges from '../../reuseableComponent/modal/ScrollableBadges';


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
    translateY,
    handleFilterPress,
    filterCount,
    isSearchVisible,
    filterBadgeVisible,
    setModelShow,
    modelShow,
    setFilterCount,
    searchQuery,
    setSearchQuery,
    setWeighBridgeTypeConnectivity,
    weighBridgeTypeConnectivity, handleSearchPress,
    toggleFilterMenu

  } = WeighBridgeScreenHooks();

  return (
    <View style={styles.container}>
      <CustomHeader
        buCode={undefined}
        userLogo={'account-circle'}
        title={'Weighbridges'}
        translateY={translateY}
        onSearchPress={handleSearchPress}
        onFilterPress={toggleFilterMenu}
        searchIcon={require("../../assets/icons/search.png")}
        filterIcon={require("../../assets/icons/filterMedium.png")}
        filterCount={filterCount} />

      {Loader ? (
        <CustomLoader />
      ) : (
        <Animated.View
          style={[styles.animatedContainer, { paddingTop: paddingTopAnimated }]}>
          {isSearchVisible && (
            <Animated.View
              style={[
                { transform: [{ translateY: translateY }] },
              ]}>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                clearSearch={() => setSearchQuery("")}
                placeholder={undefined} />
            </Animated.View>
          )}
          {
            filterBadgeVisible && weighBridgeTypeConnectivity !== "all" &&
            < View style={{ flex: 0.06 }}>
              <ScrollableBadges badges={[
                { key: 'Connectivity', value: weighBridgeTypeConnectivity },
              ]} filterCount={filterCount} setFilterCount={setFilterCount} setSelectedSpot={undefined} setSelectedDirection={undefined} setSelectedFromDate={undefined} setSelectedName={undefined} setSelectedToDate={undefined} setToDateValue={undefined} setDateFromValue={undefined}
                setConnectivity={setWeighBridgeTypeConnectivity} />
            </View>
          }
          <View style={{ flex: 1 }}>

            <SpotsDataByTypeComponent
              data={spotsData}
              type={'UNIDIRECTIONAL_WEIGHBRIDGE'}
              handleScroll={(e: { nativeEvent: { contentOffset: { y: number } } }) => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}
              handleDelete={handleDelete}
            />
          </View>
          {modelShow && (
            <FilterModal
              isVisible={modelShow}
              toggleFilterMenu={toggleFilterMenu}
              spotTypeConnectivity={weighBridgeTypeConnectivity}
              handleFilterPress={handleFilterPress}
              type={'connectivity'} />
          )
          }
          <View>

            <FloatingActionCutomButton
              onPress={() => navigation.navigate('WeighbridgesAddScreen', { id: undefined })}
              translateButtonY={translateButtonY}
            />
          </View>
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
