/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import {SpotListHook} from '../../CustomHooks/SpotHook/SpotHook';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter';
import FilterModal from '../../reuseableComponent/Filter/FilterModle';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import ScrollableBadges from '../../reuseableComponent/modal/ScrollableBadges';
import {useNetwork} from '../../contextApi/NetworkContex';
import {getResponsiveHeight} from '../../component/RFIDComponent/RfidListComponent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SpotList from '../../component/SpotListComponent/SpotList';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
function HomeScreen() {
  const {
    Loader,
    modelShow,
    filteredSpots,
    noResults,
    handleFilterPress,
    handleScroll,
    loadSpotList,
    refreshing,
    toggleFilterMenu,
    buCode,
    clearSearch,
    translateY,
    searchQuery,
    setSearchQuery,
    spotTypeConnectivity,
    setSpotTypeConnectivity,
    setFilterCount,
    filterCount,
    filterBadgeVisible,
  } = SpotListHook();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const {isConnected} = useNetwork();
  const [isAllDataRendered, setIsAllDataRendered] = useState(false);
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <GestureHandlerRootView>
        <Animated.View
          style={[styles.headerContainer, {paddingTop: translateY}]}>
          <CustomHeader
            buCode={buCode}
            userLogo="account-circle"
            title="LiveSpot"
            translateY={translateY}
            onSearchPress={handleSearchPress}
            onFilterPress={toggleFilterMenu}
            searchIcon={require('../../assets/icons/search.png')}
            filterIcon={require('../../assets/icons/filterMedium.png')}
            filterCount={undefined}
          />
          {/* Search */}
          <Animated.View
            style={[styles.searchBarContainer, {transform: [{translateY}]}]}>
            {/* <View style={styles.searchBarContainer}> */}
            {isSearchVisible && (
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                clearSearch={clearSearch}
                placeholder={undefined}
              />
            )}
            {/* </Animated.View> */}
            {/* Filter  */}
            {/* <Animated.View style={[{marginTop: -10}, {transform: [{translateY}]}]}> */}
            {filterBadgeVisible && spotTypeConnectivity !== 'all' && (
              <ScrollableBadges
                badges={[{key: 'Connectivity', value: spotTypeConnectivity}]}
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
                  {transform: [{translateY: translateY}]},
                  {
                    marginBottom:
                      isSearchVisible && spotTypeConnectivity === 'all'
                        ? getResponsiveHeight(7)
                        : spotTypeConnectivity === 'all'
                        ? getResponsiveHeight(3)
                        : getResponsiveHeight(10),
                  },
                ]}>
                <View style={styles.listWrapper}>
                  {noResults ? (
                    <Text style={styles.noResultsText}>
                      No results found for "{searchQuery}"
                    </Text>
                  ) : (
                    <>
                      <View>
                        <SpotList
                          spotData={filteredSpots}
                          refreshing={refreshing}
                          loadRfidList={loadSpotList}
                          handleScroll={handleScroll}
                          onScroll={handleScroll}
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