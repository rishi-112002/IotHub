import {Animated, StyleSheet, View} from 'react-native';
import colors from '../../assets/color/colors';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import SpotList from '../../component/SpotListComponent/SpotList';
import {SpotListHook} from '../../CustomHooks/SpotHook/SpotHook';
import React = require('react');

function HomeScreen() {
  const {spotListData, Loader, loadRfidList, refreshing, buCode} =
    SpotListHook();
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 60);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });
  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 0],
    outputRange: [60, 0],
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
        <Animated.View style={{paddingTop: paddingTopAnimated}}>
          <SpotList
            spotData={spotListData}
            loadRfidList={loadRfidList}
            refreshing={refreshing}
            onScroll={(e: {nativeEvent: {contentOffset: {y: number}}}) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            contentContainerStyle={undefined}
          />
        </Animated.View>
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
