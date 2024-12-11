import { ActivityIndicator, Animated, View, StyleSheet, Text } from 'react-native';

import React from 'react';
import colors from '../../assets/color/colors';
import SpotsDataByTypeComponent from '../../component/listComp/SpotsDataByTypeComponent';
import GenericScreenHooks from '../../CustomHooks/genericHooks/GenericScreenHooks';
import FloatingActionCutomButton from '../../reuseableComponent/customButton/FloatingActionCustomButton';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';
import ScrollableBadges from '../../reuseableComponent/modal/ScrollableBadges';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter';
import FilterModal from '../../reuseableComponent/Filter/FilterModle';
import { useNetwork } from '../../contextApi/NetworkContex';
import { errorStrings, IconName, ImagePath, Strings } from '../../assets/constants/Lable';
import { NoInternetScreen } from '../../reuseableComponent/defaultScreen/NoInternetScreen';

function GenericSpot() {
  const { isConnected } = useNetwork();
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
    fadeAnim,
    handleSearchPress,
    isSearchVisible,
    setSearchQuery,
    searchQuery,
    modelShow,
    toggleFilterMenu,
    handleFilterPress,
    filterBadgeVisible,
    filterCount,
    setFilterCount,
    genericTypeConnectivity,
    setGenericTypeConnectivity,
  } = GenericScreenHooks();
  return (
    <View style={styles.container}>
      <CustomHeader
        buCode={undefined}
        userLogo={IconName.ACCOUNT_CIRCLE}
        title={Strings.GENERIC_HEADER}
        translateY={translateY}
        onSearchPress={handleSearchPress}
        onFilterPress={toggleFilterMenu}
        filterIcon={ImagePath.FILTER_ICON}
        searchIcon={ImagePath.SEARCH_ICON}
        filterCount={filterCount}
      />
      {isConnected ? (
        Loader ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <Animated.View
            style={[styles.contentContainer, { paddingTop: paddingTopAnimated }]}>
            {isSearchVisible && (
              <Animated.View style={[{ transform: [{ translateY: translateY }] }]}>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  clearSearch={() => setSearchQuery('')}
                  placeholder={undefined}
                />
              </Animated.View>
            )}
            {filterBadgeVisible && genericTypeConnectivity !== 'all' && (
              <View style={{ flex: 0.06 }}>
                <ScrollableBadges
                  badges={[
                    { key: Strings.CONNECTIVITY, value: genericTypeConnectivity },
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
                  setConnectivity={setGenericTypeConnectivity}
                />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <SpotsDataByTypeComponent
                data={spotsData}
                type={'GENERIC_SPOT'}
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
                spotTypeConnectivity={genericTypeConnectivity}
                handleFilterPress={handleFilterPress}
                type={'connectivity'}
              />
            )}
            <FloatingActionCutomButton
              onPress={onHandlePress}
              translateButtonY={translateButtonY}
            />
          </Animated.View>
        )
      ) : (
        // eslint-disable-next-line react-native/no-inline-styles
        <NoInternetScreen />
      )}
      {isVisible && (
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <CustomAlert
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            onOkPress={confirmDelete}
            title={Strings.GENERIC_SPOT}
            message={Strings.CONFIRM_GENERIC_DELETE}
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
