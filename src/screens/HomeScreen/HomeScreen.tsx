import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import { SpotListHook } from '../../CustomHooks/SpotHook/SpotHook';

import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import SpotList from '../../component/SpotListComponent/SpotList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors2 } from '../../assets/color/Colors2';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen() {
  const { Loader, modelShow, filteredSpots, noResults, handleFilterPress, handleScroll, loadRfidList, clearFilter, spotTypeConnectivity, refreshing, toggleFilterMenu, buCode, clearSearch, translateY, searchQuery, setSearchQuery } =
    SpotListHook();


  return (
    <SafeAreaView style={styles.container1}>
      {/* Your Header and Search Bar Components */}
      <Animated.View style={[styles.headerContainer, { paddingTop: translateY }]}>
        <CustomHeader
          buCode={buCode}
          userLogo={'account-circle'}
          title={'LiveSpot'}
          translateY={translateY}
          onSearchPress={undefined}
          onFilterPress={undefined}
          searchIcon={require("../../assets/icons/search.png")}
          filterIcon={require("../../assets/icons/filterMedium.png")} />
        <Animated.View
          style={[
            styles.searchBarContainer,
            { transform: [{ translateY: translateY }] },
          ]}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchInput}>
              <MaterialIcons
                name="search"
                size={30}
                color={Colors2.IconColor}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Search by name..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={clearSearch}
                  style={styles.clearButton}>
                  <MaterialIcons
                    name="clear"
                    size={20}
                    color={colors.redBase}
                  />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={toggleFilterMenu}>
              <MaterialIcons
                name="filter-list-alt"
                size={24}
                color={'white'}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
          {/* Display selected filter below search */}
          {spotTypeConnectivity !== 'all' ? (
            <View style={styles.selectedFilterContainer}>
              <Text style={styles.selectedFilterText}>
                {spotTypeConnectivity === 'connected' ? 'Connected' : 'Not-Connected'}
              </Text>
              <TouchableOpacity
                onPress={clearFilter}
                style={styles.clearFilterButton}>
                <MaterialIcons name="clear" size={16} color={colors.redBase} />
              </TouchableOpacity>
            </View>
          ) : null}
        </Animated.View>
      </Animated.View>

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
            <View style={{ paddingHorizontal: 5 }}>

              <SpotList
                spotData={filteredSpots}
                loadRfidList={loadRfidList}
                refreshing={refreshing}
                onScroll={handleScroll}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          )}
          {/* FilterMenu rendering logic */}
          {modelShow && (
            <TouchableWithoutFeedback onPress={toggleFilterMenu}>
              <View style={styles.overlay}>
                <View style={styles.filterMenuContainer}>
                  {/* <View style={styles.triangle} /> */}
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      spotTypeConnectivity === 'connected' && styles.selectedFilter,
                    ]}
                    onPress={() => handleFilterPress('connected')}>
                    <MaterialIcons name="link" size={24} color="black" />
                    <Text style={styles.filterText}>Connected</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      spotTypeConnectivity === 'not-connected' && styles.selectedFilter,
                    ]}
                    onPress={() => handleFilterPress('not-connected')}>
                    <MaterialIcons name="link-off" size={24} color="black" />
                    <Text style={styles.filterText}>Not Connected</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      spotTypeConnectivity === 'all' && styles.selectedFilter,
                    ]}
                    onPress={() => handleFilterPress('all')}>
                    <MaterialIcons name="filter-list" size={24} color="black" />
                    <Text style={styles.filterText}>All</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: colors.white,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 40,
  },
  filterMenuContainer: {
    marginTop: 5,
    width: '50%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignSelf: 'flex-end',
    elevation: 5,
    marginRight: 10,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  selectedFilter: {
    backgroundColor: '#e0e0e0',
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
  },
  headerContainer: {
    paddingTop: 15,
  },
  searchBarContainer: {
    marginTop: 60,
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderColor: '#dbd9da',
    borderRadius: 8,
    fontSize: fontSizes.text,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.backgroundColor,
  },
  textInput: {
    width: '83%',
    fontSize: fontSizes.text,
  },
  clearButton: {
    borderRadius: 30,
    padding: 1,
  },
  filterButton: {
    borderColor: '#dbd9da',
    backgroundColor: colors.blueBase,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filterIcon: {
    padding: 8,
  },
  listWrapper: {
    flex: 1,
    marginTop: 8,
    marginBottom: -70,
  },
  listContainer: {
    flex: 1,
  },
  selectedFilterContainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  selectedFilterText: {
    fontSize: fontSizes.smallText,
    color: colors.gray,
  },
  clearFilterButton: {
    padding: 5,
    borderRadius: 20,
    paddingRight: 20,
  },
  noResultsText: {
    justifyContent: 'center',
    fontSize: 18,
    color: colors.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default HomeScreen;
