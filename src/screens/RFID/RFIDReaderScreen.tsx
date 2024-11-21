import React, {useState} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import FloatingActionCustomButton from '../../reuseableComponent/customButton/FloatingActionCustomButton';
import {RfidListHook} from '../../CustomHooks/RFIDHooks/RFIDListHook';
import RfidListComponent from '../../component/RFIDComponent/RfidListComponent';
import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';
import SearchBar from '../../reuseableComponent/Filter/SearchFilter'; // Import your custom search component

const RfidReader = ({navigation}) => {
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
  } = RfidListHook();

  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to control search bar visibility
  // const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  // const [filteredData, setFilteredData] = useState(rfidData); // Filtered RFID data based on search

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 10],
    outputRange: [0, -10],
  });

  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

  const translateButtonY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
  });

  // Handle search input change
  // const handleSearchChange = query => {
  //   setSearchQuery(query);

  //   // Filter RFID data based on search query
  //   if (query.length > 0) {
  //     const filtered = rfidData.filter(
  //       item => item.name.toLowerCase().includes(query.toLowerCase()), // Modify this condition to suit your data structure
  //     );
  //     setFilteredData(filtered);
  //   } else {
  //     setFilteredData(rfidData); // Reset the filtered data when query is empty
  //   }
  // };

  // Toggle search bar visibility
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle search bar visibility
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <CustomHeader
        title="RFID Readers"
        buCode={buCode}
        userLogo={'account-circle'}
        translateY={translateY}
        onSearchPress={handleSearchPress} // Set search press handler
        onFilterPress={undefined}
        searchIcon={require('../../assets/icons/search.png')}
        filterIcon={require('../../assets/icons/filterMedium.png')}
      />

      {/* Conditionally render search bar */}
      {isSearchVisible && (
        <Animated.View
          style={[
            styles.searchBarContainer,
            {transform: [{translateY: translateY}]},
          ]}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={undefined}
          />
        </Animated.View>
      )}

      <Animated.View style={{flex: 1, paddingTop: paddingTopAnimated}}>
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
          translateButtonY={translateButtonY}
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
