/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import {
  Animated,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import { SpotListHook } from '../../CustomHooks/SpotHook/SpotHook';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter';
import FilterModal from '../../reuseableComponent/Filter/FilterModle';
import ScrollableBadges from '../../reuseableComponent/modal/ScrollableBadges';
import { useNetwork } from '../../contextApi/NetworkContex';
import { getResponsiveHeight } from '../../component/RFIDComponent/RfidListComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SpotList from '../../component/SpotListComponent/SpotList';
import { IconName, ImagePath, Strings } from '../../assets/constants/Lable';
import { NoInternetScreen } from '../../reuseableComponent/defaultScreen/NoInternetScreen';
import { ScrollContext } from '../../contextApi/AnimationContext';
import { STYLES } from '../ScreensStyles';
function HomeScreen() {
  const {
    Loader,
    modelShow,
    filteredSpots,
    noResults,
    handleFilterPress,
    loadSpotList,
    refreshing,
    toggleFilterMenu,
    buCode,
    clearSearch,
    searchQuery,
    setSearchQuery,
    spotTypeConnectivity,
    setSpotTypeConnectivity,
    setFilterCount,
    filterCount,
    filterBadgeVisible,
  } = SpotListHook();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isConnected } = useNetwork();
  const { scrollY, headerTranslate, searchBarTranslate } = useContext(

    ScrollContext
  );
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={STYLES.Home_container}>
      <GestureHandlerRootView>
        <Animated.View
          style={[{ paddingTop: headerTranslate }]}>
          <CustomHeader
            buCode={buCode}
            userLogo={IconName.ACCOUNT_CIRCLE}
            title={Strings.SPOTS}
            translateY={headerTranslate}
            onSearchPress={handleSearchPress}
            onFilterPress={toggleFilterMenu}
            filterIcon={ImagePath.FILTER_ICON}
            searchIcon={ImagePath.SEARCH_ICON}
            filterCount={undefined}
          />
          {/* Search */}
          <Animated.View
            style={[STYLES.Home_searchBarContainer, { paddingTop: searchBarTranslate, zIndex: 1000 }]}>
            {isSearchVisible && (
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                clearSearch={clearSearch}
                placeholder={undefined}
              />
            )}
            {filterBadgeVisible && spotTypeConnectivity !== Strings.ALL && (
              <ScrollableBadges
                badges={[{ key: Strings.CONNECTIVITY, value: spotTypeConnectivity }]}
                filterCount={filterCount}
                setFilterCount={setFilterCount}
                setConnectivity={setSpotTypeConnectivity}
                setSelectedSpot={undefined}
                setSelectedDirection={undefined}
                setSelectedFromDate={undefined}
                setSelectedName={undefined}
                setSelectedToDate={undefined}
                setToDateValue={undefined}
                setDateFromValue={undefined}
              />
            )}
            {/* </View> */}
          </Animated.View>
        </Animated.View>
        {isConnected ? (
          <>
            {Loader ? (
              <BouncingLoader />
            ) : (
              <Animated.View
                style={[
                  STYLES.Home_listWrapper,
                  { transform: [{ translateY: headerTranslate }] },
                  {
                    marginBottom:
                      isSearchVisible && spotTypeConnectivity === Strings.ALL
                        ? getResponsiveHeight(10)
                        : spotTypeConnectivity === Strings.ALL
                          ? getResponsiveHeight(3)
                          : getResponsiveHeight(9),
                  },
                ]}>
                <View style={STYLES.Home_listWrapper}>
                  {noResults ? (
                    <Text style={STYLES.noResultsText}>
                      {Strings.NO_SEARCH_FOUND_FOR} "{searchQuery}"
                    </Text>
                  ) : (
                    <>
                      <View style={{ marginBottom: getResponsiveHeight(12) }}>
                        <SpotList
                          spotData={filteredSpots}
                          refreshing={refreshing}
                          loadRfidList={loadSpotList}
                          handleScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                          )}
                          contentContainerStyle={undefined}
                        />
                      </View>
                    </>
                  )}
                  {modelShow && (
                    <FilterModal
                      type="connectivity"
                      isVisible={modelShow}
                      toggleFilterMenu={toggleFilterMenu}
                      spotTypeConnectivity={spotTypeConnectivity}
                      handleFilterPress={handleFilterPress}
                    />
                  )}
                </View>
              </Animated.View>
            )}
          </>
        ) : (
          <NoInternetScreen />
        )}
        {/* </Animated.View> */}
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
}
export default HomeScreen;
