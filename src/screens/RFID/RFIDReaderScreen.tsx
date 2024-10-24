/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState } from 'react';
import { View, Animated } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import colors from '../../assets/color/colors';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import FloatingActionCustomButton from '../../reuseableComponent/customButton/FloatingActionCustomButton';
import { RfidListHook } from '../../CustomHooks/RFIDHooks/RFIDListHook';
import RfidListComponent from '../../component/RFIDComponent/RfidListComponent';

const RfidReader = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { ListData, Loader, loadRfidList, handleDelete, refreshing, buCode } = RfidListHook();
  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY, 0, 60)
  const translateY = diffClamp.interpolate({
      inputRange: [0, 60],
      outputRange: [0, -60]
  })
  const paddingTopAnimated = scrollY.interpolate({
      inputRange: [0, 0],
      outputRange: [60, 0],
      extrapolate: 'clamp', // Ensures the value doesn't exceed the input range
  });
  const translateButtonY = diffClamp.interpolate({
    inputRange: [0, 0],
    outputRange: [0, 100]
  })
 


  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* Header */}
     
        <CustomHeader title="RFID Readers" buCode={buCode} userLogo={'account-circle'} translateY={translateY} />

      {/* List Content */}
      <Animated.View style={{ flex: 1 , paddingTop: paddingTopAnimated}}>
        <RfidListComponent
          ListData={ListData}
          Loader={Loader}
          scrollY={scrollY}
          handleDelete={handleDelete}
          loadRfidList={loadRfidList}
          refreshing={refreshing}
          handleScroll={(e: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          } } buttonVisible={false}    />
          <FloatingActionCustomButton onPress={() => navigation.navigate('RFID ADD')} translateButtonY={translateButtonY} />
    </Animated.View>
    </View>

  );
};

export default React.memo(RfidReader);
