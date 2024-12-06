/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import { SpotListHook } from '../../CustomHooks/SpotHook/SpotHook';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter';
import FilterModal from '../../reuseableComponent/Filter/FilterModle';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import ScrollableBadges from '../../reuseableComponent/modal/ScrollableBadges';
import { useNetwork } from '../../contextApi/NetworkContex';
import { getResponsiveHeight } from '../../component/RFIDComponent/RfidListComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SpotList from '../../component/SpotListComponent/SpotList';
// <<<<<<< HEAD
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// function HomeScreen({route}: {route: any}) {
//   const {scrollY, headerTranslate} = route.params;
// =======
function HomeScreen({ route }: { route: any }) {
// >>>>>>> 892e29bf45c5d5a1934b30c7268a847cc19175a7
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
  const { scrollY, headerTranslate, searBarTranslate } = route.params;
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <GestureHandlerRootView>
        <Animated.View
          style={[styles.headerContainer, { paddingTop: headerTranslate }]}>
          <CustomHeader
            buCode={buCode}
            userLogo="account-circle"
            title="Spots"
            translateY={headerTranslate}
            onSearchPress={handleSearchPress}
            onFilterPress={toggleFilterMenu}
            searchIcon={require('../../assets/icons/search.png')}
            filterIcon={require('../../assets/icons/filterMedium.png')}
            filterCount={undefined}
          />
          {/* Search */}
          <Animated.View
            style={[styles.searchBarContainer, { paddingTop: searBarTranslate, zIndex: 1000 }]}>
            {/* <View style={styles.searchBarContainer}> */}
            {isSearchVisible && (
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                clearSearch={clearSearch}
                placeholder={undefined}
              />
            )}
            {filterBadgeVisible && spotTypeConnectivity !== 'all' && (
              <ScrollableBadges
                badges={[{ key: 'Connectivity', value: spotTypeConnectivity }]}
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
                  styles.listWrapper,
                  { transform: [{ translateY: headerTranslate }] },
                  {
                    marginBottom:
                      isSearchVisible && spotTypeConnectivity === 'all'
                        ? getResponsiveHeight(10)
                        : spotTypeConnectivity === 'all'
// <<<<<<< HEAD
                        ? getResponsiveHeight(3)
                        : getResponsiveHeight(9),
// =======
//                           ? getResponsiveHeight(3)
//                           : getResponsiveHeight(10),
// >>>>>>> 892e29bf45c5d5a1934b30c7268a847cc19175a7
                  },
                ]}>
                <View style={styles.listWrapper}>
                  {noResults ? (
                    <Text style={styles.noResultsText}>
                      No results found for "{searchQuery}"
                    </Text>
                  ) : (
                    <>
                      <View style={{marginBottom: getResponsiveHeight(12)}}>
                        <SpotList
                          spotData={filteredSpots}
                          refreshing={refreshing}
                          loadRfidList={loadSpotList}
                          handleScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                          )}
                          // onScroll={handleScroll}
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
          <View style={styles.noConnection}>
            <Text>No Internet Connection</Text>
          </View>
        )}
        {/* </Animated.View> */}
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 9999,
  },
  headerContainer: {
    // flex: 1,
    // zIndex: 9999,
  },
  listWrapper: {
    zIndex: 9999,
    paddingHorizontal: 4.5,
    // marginTop: 2,
  },
  noResultsText: {
    justifyContent: 'center',
    fontSize: fontSizes.text,
    color: colors.gray,
    paddingVertical: 100,
    textAlign: 'center',
  },
  searchBarContainer: {
    // zIndex: 9999,
    marginTop: 60,
    marginBottom: 5,
  },
  footerLoaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    // marginBottom: 100,
  },
  footerLoaderText: {
    marginLeft: 10,
    fontSize: fontSizes.smallText,
    color: colors.gray,
  },
  noConnection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
