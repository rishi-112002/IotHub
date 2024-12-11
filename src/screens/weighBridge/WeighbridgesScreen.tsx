import { Animated, View, StyleSheet, Text } from 'react-native';
import React from 'react';
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
import { useNetwork } from '../../contextApi/NetworkContex';
import { errorStrings, IconName, ImagePath, Strings } from '../../assets/constants/Lable';
import { NoInternetScreen } from '../../reuseableComponent/defaultScreen/NoInternetScreen';

function Weighbridges() {
  const { isConnected } = useNetwork();

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
    weighBridgeTypeConnectivity,
    handleSearchPress,
    toggleFilterMenu,
  } = WeighBridgeScreenHooks();

  return (
    <View style={styles.container}>
      <CustomHeader
        buCode={undefined}
        userLogo={IconName.ACCOUNT_CIRCLE}
        title={Strings.WEIGHBRIDGES}
        translateY={translateY}
        onSearchPress={handleSearchPress}
        onFilterPress={toggleFilterMenu}
        filterIcon={ImagePath.FILTER_ICON}
        searchIcon={ImagePath.SEARCH_ICON}
        filterCount={filterCount}
      />
      {isConnected ? (
        Loader ? (
          <CustomLoader />
        ) : (
          <Animated.View
            style={[
              styles.animatedContainer,
              { paddingTop: paddingTopAnimated },
            ]}>
            {isSearchVisible && (
              <Animated.View
                style={[{ transform: [{ translateY: translateY }] }]}>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  clearSearch={() => setSearchQuery('')}
                  placeholder={undefined}
                />
              </Animated.View>
            )}
            {filterBadgeVisible &&
              weighBridgeTypeConnectivity !== 'all' && (
                <View style={{ flex: 0.06 }}>
                  <ScrollableBadges
                    badges={[
                      {
                        key: Strings.CONNECTIVITY,
                        value: weighBridgeTypeConnectivity,
                      },
                    ]}
                    filterCount={filterCount}
                    setFilterCount={setFilterCount}
                    setSelectedSpot={undefined}
                    setSelectedDirection={undefined}
                    setSelectedFromDate={undefined}
                    setSelectedName={undefined}
                    setSelectedToDate={undefined}
                    setToDateValue={undefined}
                    setDateFromValue={undefined}
                    setConnectivity={setWeighBridgeTypeConnectivity}
                  />
                </View>
              )}
            <View style={{ flex: 1 }}>
              <SpotsDataByTypeComponent
                data={spotsData}
                type={Strings.UNIDIRECTIONAL_WEIGHBRIDGE}
                handleScroll={(e: {
                  nativeEvent: { contentOffset: { y: number } };
                }) => {
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
                type={'connectivity'}
              />
            )}
            <View>
              <FloatingActionCutomButton
                onPress={() =>
                  navigation.navigate('WeighbridgesAddScreen', {
                    id: undefined,
                  })
                }
                translateButtonY={translateButtonY}
              />
            </View>
          </Animated.View>
        )
      ) : (
        <NoInternetScreen />
      )}

      {/* Animated CustomAlert */}
      {isVisible && (
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <CustomAlert
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            onOkPress={confirmDelete}
            title={Strings.WEIGHBRIDGE_SPOT}
            message={Strings.CONFIRM_WEIGHBRIDGE_DELETE}
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
