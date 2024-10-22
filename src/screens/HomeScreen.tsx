import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../assets/color/colors';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../reuseableComponent/loader/BallBouncingLoader';
import SpotList from '../component/SpotListComponent/SpotList';
import {SpotListHook} from '../CustomHooks/SpotHook/SpotHook';

function HomeScreen() {
  const {spotListData, Loader, loadRfidList, refreshing, buCode} = SpotListHook();
  // console.log("Home Screen Data :- ",spotListData);
  return (
    <View style={styles.container}>
      <CustomHeader
        buCode={buCode}
        userLogo={'account-circle'}
        title={'IotHub'}
      />
      {Loader ? (
        <BouncingLoader />
      ) : (
        <View style={{marginBottom: 40}}>
          <SpotList
            spotData={spotListData}
            Loader={Loader}
            // scrollY={scrollY}
            loadRfidList={loadRfidList}
            refreshing={refreshing}
            scrollY={undefined}
            // handleDelete={handleDelete}
            // buttonVisible={buttonVisible}
            // handleScroll={handleScroll}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    columnGap: 25,
  },
  subHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkblack,
  },
});

export default HomeScreen;
