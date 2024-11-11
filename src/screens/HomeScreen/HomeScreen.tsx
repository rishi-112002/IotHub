import {Animated, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import SpotList from '../../component/SpotListComponent/SpotList';
import {SpotListHook} from '../../CustomHooks/SpotHook/SpotHook';
import colors from '../../assets/color/colors';

function HomeScreen() {
  const {spotListData, Loader, loadRfidList, refreshing, buCode} =
    SpotListHook();

  // State to manage filter for connected / not-connected spots
  const [filter, setFilter] = useState<'connected' | 'not-connected' | 'all'>(
    'all',
  );

  // Filter spots based on the selected filter
  const filteredSpots = spotListData.filter(spot => {
    if (filter === 'connected') {
      return spot.active;
    }
    if (filter === 'not-connected') {
      return !spot.active;
    }
    return true; // 'all' shows all spots
  });

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 60);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });
  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <CustomHeader
        buCode={buCode}
        userLogo={'account-circle'}
        title={'IotHub'}
        translateY={translateY}
      />
      {Loader ? (
        <BouncingLoader />
      ) : (
        <>
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

          {/* Spot List */}
          <Animated.View style={{paddingTop: paddingTopAnimated}}>
            <SpotList
              spotData={filteredSpots}
              loadRfidList={loadRfidList}
              refreshing={refreshing}
              onScroll={(e: {nativeEvent: {contentOffset: {y: number}}}) => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}
              contentContainerStyle={undefined}
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
  filterContainer: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 10,
  },
  selectedFilterButton: {
    backgroundColor: colors.skyDark, // Change to your desired selected color
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkblack,
  },
});

export default HomeScreen;
