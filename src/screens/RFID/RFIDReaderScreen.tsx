/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import FloatingActionCustomButton from '../../reuseableComponent/customButton/FloatingActionCustomButton';
import {RfidListHook} from '../../CustomHooks/RFIDHooks/RFIDListHook';
import RfidListComponent from '../../component/RFIDComponent/RfidListComponent';
import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter'; // Import your custom search component
import ScrollableBadges from '../../reuseableComponent/modal/ScrollableBadges';
import FilterModal from '../../reuseableComponent/Filter/FilterModle';

const RfidReader = ({navigation}: any) => {
  const {
    Loader,
    loadRfidList,
    handleDelete,
    refreshing,
    buCode,
    alertVisible,
    setAlertVisible,
    confirmDelete,
    filteredRfid,
    setSearchQuery,
    searchQuery,
    handleSearchPress,
    isSearchVisible,
    modelShow,
    toggleFilterMenu,
    handleFilterPress,
    filterBadgeVisible,
    filterCount,
    setFilterCount,
    rfidType,
    setRfidType,
  } = RfidListHook();
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 10],
    outputRange: [0, -10],
  });

  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });

  const translateButtonY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <CustomHeader
        title="RFID Readers"
        buCode={buCode}
        userLogo={'account-circle'}
        translateY={translateY}
        onSearchPress={handleSearchPress} // Set search press handler
        onFilterPress={toggleFilterMenu}
        searchIcon={require('../../assets/icons/search.png')}
        filterIcon={require('../../assets/icons/filterMedium.png')}
        filterCount={filterCount}
      />

      {/* Conditionally render search bar */}

      <Animated.View style={{flex: 1, paddingTop: paddingTopAnimated}}>
        {isSearchVisible && (
          <Animated.View style={[{transform: [{translateY: translateY}]}]}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clearSearch={() => setSearchQuery('')}
              placeholder={undefined}
            />
          </Animated.View>
        )}
        {filterBadgeVisible && rfidType !== 'all' && (
          <View style={{flex: 0.06, marginTop: 10}}>
            <ScrollableBadges
              badges={[{key: 'Connectivity', value: rfidType}]}
              filterCount={filterCount}
              setFilterCount={setFilterCount}
              setSelectedSpot={undefined}
              setSelectedDirection={undefined}
              setSelectedFromDate={undefined}
              setSelectedName={undefined}
              setSelectedToDate={undefined}
              setToDateValue={undefined}
              setDateFromValue={undefined}
              setConnectivity={setRfidType}
            />
          </View>
        )}

        <RfidListComponent
          ListData={filteredRfid} // Use filtered data here
          Loader={Loader}
          scrollY={scrollY}
          handleDelete={handleDelete}
          loadRfidList={loadRfidList}
          refreshing={refreshing}
          handleScroll={e => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          buttonVisible={false}
        />
        {modelShow && (
          <FilterModal
            isVisible={modelShow}
            toggleFilterMenu={toggleFilterMenu}
            spotTypeConnectivity={rfidType}
            handleFilterPress={handleFilterPress}
            type={'used'}
          />
        )}

        {alertVisible && (
          <CustomAlert
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            onOkPress={confirmDelete}
            title="Delete RFID"
            message="Are you sure you want to delete this RFID?"
            showCancel={true}
          />
        )}

        <FloatingActionCustomButton
          onPress={() => navigation.navigate('RfidAdd')}
          translateButtonY={translateButtonY} // translateButtonY={translateButtonY}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    // marginTop: 60,
    // marginBottom: -42,
  },
});

export default React.memo(RfidReader);
