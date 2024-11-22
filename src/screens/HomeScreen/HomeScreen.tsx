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

function HomeScreen() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
    filterBadgeVisible
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
          title={'LiveSpot'}
          translateY={translateY}
          onSearchPress={handleSearchPress}
          onFilterPress={toggleFilterMenu}
          searchIcon={require('../../assets/icons/search.png')} // Ensure this file exists and is correct
          filterIcon={require('../../assets/icons/filterMedium.png')} // Ensure this file exists and is correct
          filterCount={undefined} />
        <Animated.View
          style={[
            styles.searchBarContainer,
            { transform: [{ translateY: translateY }] },
          ]}>
          {isSearchVisible && (
            <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch} placeholder={undefined} />
          )}
          {
            filterBadgeVisible && spotTypeConnectivity !== "all" &&
            < View >
              <ScrollableBadges badges={[
                { key: 'Connectivity', value: spotTypeConnectivity },
              ]} filterCount={filterCount} setFilterCount={setFilterCount}
                setSelectedSpot={undefined} setSelectedDirection={undefined} setSelectedFromDate={undefined} setSelectedName={undefined} setSelectedToDate={undefined} setToDateValue={undefined} setDateFromValue={undefined}
                setConnectivity={setSpotTypeConnectivity} />
            </View>
          }
        </Animated.View>
      </Animated.View>

      {/* Conditionally render Search Bar */}

      {Loader ? (
        <BouncingLoader />
      ) : (
        <Animated.View
          style={[styles.listWrapper, { transform: [{ translateY: translateY }] }]}>
          {noResults ? (
            <Text style={styles.noResultsText}>
              No results found for "{searchQuery}"
            </Text>
          ) : (
            <View style={{ flex: 1 }}>

              <SpotList
                spotData={filteredSpots}
                loadRfidList={loadRfidList}
                refreshing={refreshing}
                onScroll={handleScroll}
                contentContainerStyle={styles.listContainer}
              />
            </View>

          )}
          {modelShow && (
            <View style={{ flex: 1 }}>
              <FilterModal
                type='connectivity'
                isVisible={modelShow}
                toggleFilterMenu={toggleFilterMenu}
                spotTypeConnectivity={spotTypeConnectivity}
                handleFilterPress={handleFilterPress}
              />
            </View>
          )}
        </Animated.View>
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
    // flex: 0.1
    // paddingTop: 25,
    // backgroundColor: "pink"
  },
  listWrapper: {
    flex: 1,
    // backgroundColor: "yellow"
    // marginTop: 50,
    // marginBottom: -70,
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
    // backgroundColor: "red"
  },
});

export default HomeScreen;
