import React, {useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import {SpotListHook} from '../../CustomHooks/SpotHook/SpotHook';
import SpotList from '../../component/SpotListComponent/SpotList';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter'; // Import the SearchBar component
import FilterModal from '../../reuseableComponent/Filter/FilterModle'; // Import the FilterModal component
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

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
  } = SpotListHook();

  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <SafeAreaView style={styles.container1}>
      {/* Your Header and Search Bar Components */}
      <Animated.View style={[styles.headerContainer, {paddingTop: translateY}]}>
        <CustomHeader
          buCode={buCode}
          userLogo={'account-circle'} // This should be valid
          title={'LiveSpot'}
          translateY={translateY}
          onSearchPress={handleSearchPress}
          onFilterPress={toggleFilterMenu}
          searchIcon={require('../../assets/icons/search.png')} // Ensure this file exists and is correct
          filterIcon={require('../../assets/icons/filterMedium.png')} // Ensure this file exists and is correct
        />
        <Animated.View
          style={[
            styles.searchBarContainer,
            {transform: [{translateY: translateY}]},
          ]}>
          {isSearchVisible && (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clearSearch={clearSearch}
            />
          )}
        </Animated.View>
      </Animated.View>

      {/* Conditionally render Search Bar */}

      {Loader ? (
        <BouncingLoader />
      ) : (
        <Animated.View
          style={[styles.listWrapper, {transform: [{translateY: translateY}]}]}>
          {noResults ? (
            <Text style={styles.noResultsText}>
              No results found for "{searchQuery}"
            </Text>
          ) : (
            <SpotList
              spotData={filteredSpots}
              loadRfidList={loadRfidList}
              refreshing={refreshing}
              onScroll={handleScroll}
              contentContainerStyle={styles.listContainer}
            />
          )}
          {modelShow && (
            <View style={{flex: 1}}>
              <FilterModal
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
    paddingTop: 25,
  },
  listWrapper: {
    flex: 1,
    marginTop: 50,
    marginBottom: -70,
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
    // marginBottom: -20,
    // marginTop: 5,
  },
});

export default HomeScreen;
