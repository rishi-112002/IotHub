import React, {useState, useCallback} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import {SpotListHook} from '../../CustomHooks/SpotHook/SpotHook';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import SpotList from '../../component/SpotListComponent/SpotList';
import {Colors2} from '../../assets/color/Colors2';

function HomeScreen() {
  const {spotListData, Loader, loadRfidList, refreshing, buCode} =
    SpotListHook();

  const [filter, setFilter] = useState<'connected' | 'not-connected' | 'all'>(
    'all',
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Filter spots based on the selected filter and search query
  const filteredSpots = spotListData.filter(spot => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'connected' && spot?.active) ||
      (filter === 'not-connected' && !spot?.active);
    const matchesSearch = spot?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Animated scroll logic for header and search bar visibility
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 70);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -150],
  });

  // const translateSearchBar = diffClamp.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [-100, -150],
  // });

  // const listPaddingTop = translateY.interpolate({
  //   inputRange: [0, 1000],
  //   outputRange: [10, 1000],
  //   extrapolate: 'clamp',
  // });

  return (
    <View style={styles.container}>
      <Animated.View style={[{paddingTop: translateY}]}>
        <CustomHeader
          buCode={buCode}
          userLogo={'account-circle'}
          title={'IotHub'}
          translateY={translateY}
        />
        {/* Animated Search Bar */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'connected' && styles.selectedFilterButton,
              ]}
              onPress={() => setFilter('connected')}>
              <Text style={styles.filterButtonText}>Connected</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'not-connected' && styles.selectedFilterButton,
              ]}
              onPress={() => setFilter('not-connected')}>
              <Text style={styles.filterButtonText}>Not Connected</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'all' && styles.selectedFilterButton,
              ]}
              onPress={() => setFilter('all')}>
              <Text style={styles.filterButtonText}>All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
        </Animated.View>
      </Animated.View>

      {Loader ? (
        <BouncingLoader />
      ) : (
        <>
          <Animated.View style={styles.listContainer}>
            {/* Keeping SpotList as is, no changes here */}
            <SpotList
              spotData={filteredSpots}
              loadRfidList={loadRfidList}
              refreshing={refreshing}
              onScroll={(e: {nativeEvent: {contentOffset: {y: number}}}) => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}
              contentContainerStyle={undefined} // Assuming contentContainerStyle is being managed inside SpotList
            />
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    // flex: 1,
    // position: 'absolute',
    // top: 10,
    // left: 0,
    // right: 0,
    paddingHorizontal: 20,
    zIndex: 1,
    marginTop: 60,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 20,
    paddingLeft: 10,
    fontSize: fontSizes.text,
    backgroundColor: '#F0F0F0',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  selectedFilterButton: {
    backgroundColor: colors.skyDark,
  },
  filterButtonText: {
    fontSize: fontSizes.text,
    fontWeight: '600',
    color: colors.darkblack,
  },
  divider: {
    height: 1,
    marginVertical: 5,
    backgroundColor: '#d4d4d4',
  },
  listContainer: {
    flex: 1,
  },
});

export default HomeScreen;
