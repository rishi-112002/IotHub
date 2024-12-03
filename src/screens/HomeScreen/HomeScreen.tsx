/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import { SpotListHook } from '../../CustomHooks/SpotHook/SpotHook';
import SpotList from '../../component/SpotListComponent/SpotList';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter'; // Import the SearchBar component
import FilterModal from '../../reuseableComponent/Filter/FilterModle'; // Import the FilterModal component
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import ScrollableBadges from '../../reuseableComponent/modal/ScrollableBadges';
import { useNetwork } from '../../contextApi/NetworkContex';

function HomeScreen({ route }: { route: any }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isConnected } = useNetwork();
  const { scrollY, headerTranslate } = route.params;
  console.log("ScrollY and HeaderTranslate", headerTranslate, scrollY)


  const {
    Loader,
    modelShow,
    filteredSpots,
    noResults,
    handleFilterPress,
    handleScroll,
    loadRfidList,
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

  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <SafeAreaView style={styles.container1}>
      {/* Your Header and Search Bar Components */}
      <Animated.View style={[styles.headerContainer, { paddingTop: translateY }]}>
        <CustomHeader
          buCode={buCode}
          userLogo={'account-circle'} // This should be valid
          title={'Spots'}
          translateY={headerTranslate}
          onSearchPress={handleSearchPress}
          onFilterPress={toggleFilterMenu}
          searchIcon={require('../../assets/icons/search.png')} // Ensure this file exists and is correct
          filterIcon={require('../../assets/icons/filterMedium.png')} // Ensure this file exists and is correct
          filterCount={undefined}
        />
        <Animated.View
          style={[
            styles.searchBarContainer,
            { transform: [{ translateY: headerTranslate }] },
          ]}>
          {isSearchVisible && (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clearSearch={clearSearch}
              placeholder={undefined}
            />
          )}
        </Animated.View>
        <Animated.View
          style={[
            // styles.searchBarContainer,
            { marginTop: -10 },
            { transform: [{ translateY: headerTranslate }] },
          ]}>
          {filterBadgeVisible && spotTypeConnectivity !== 'all' && (
            <View>
              <ScrollableBadges
                badges={[{ key: 'Connectivity', value: spotTypeConnectivity }]}
                filterCount={filterCount}
                setFilterCount={setFilterCount}
                setSelectedSpot={undefined}
                setSelectedDirection={undefined}
                setSelectedFromDate={undefined}
                setSelectedName={undefined}
                setSelectedToDate={undefined}
                setToDateValue={undefined}
                setDateFromValue={undefined}
                setConnectivity={setSpotTypeConnectivity}
              />
            </View>
          )}
        </Animated.View>
      </Animated.View>

      {/* Conditionally render Search Bar */}

      {isConnected ? (
        Loader ? (
          <BouncingLoader />
        ) : (
         
          <View style={{flex:1}}>


            {noResults ? (
              <Text style={styles.noResultsText}>
                No results found for "{searchQuery}"
              </Text>
            ) : (
              <SpotList
                spotData={filteredSpots}
                loadRfidList={loadRfidList}
                refreshing={refreshing}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
                contentContainerStyle={styles.listContainer}
              />
            )}
            {modelShow && (
              <View>
                <FilterModal
                  type="connectivity"
                  isVisible={modelShow}
                  toggleFilterMenu={toggleFilterMenu}
                  spotTypeConnectivity={spotTypeConnectivity}
                  handleFilterPress={handleFilterPress}
                />
              </View>
            )}
          </View>
        )
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <Text>No Internet Connection</Text>
        </View>
      )}

      {/* Filter Modal */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
  },
  listWrapper: {
    flex: 1.9,
    marginTop: 2,
    marginBottom: -50,
  },
  listContainer: {
    // flex: 1,
  },
  noResultsText: {
    justifyContent: 'center',
    fontSize: fontSizes.text,
    color: colors.gray,
    paddingVertical: 100,
    textAlign: 'center',
  },
  searchBarContainer: {
    // flex: 1
    marginTop: 60,
    marginBottom: 10,
    // backgroundColor: "red"
  },
});

export default HomeScreen;
