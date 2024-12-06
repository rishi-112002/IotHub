/* eslint-disable react-native/no-inline-styles */

import React, { } from 'react';
import { Animated, View } from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import DashBoardHook from '../../CustomHooks/dashBordEffect/DashBoardHooks';
import { useNetwork } from '../../contextApi/NetworkContex';
import DashboardComp from '../../component/dashBoardCom/DashBoardComp';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import colors from '../../assets/color/colors';
function DashBoard({ route }: { route: any }) {
  const { isConnected } = useNetwork();

  const { scrollY, headerTranslate } = route.params;
  const {
    buCode,
    spotListData,
    eventLogsByTime,
    WeighBridgeDisConnected,
    WeighBridgeConnected,
    genericDisConnected,
    genericConnected,
    rfidCount,
    rfidUnUsedCount,
    navigation,
    rfidUsedCount,
    topRecentLogs,
    isLoading,
    setModalVisible,
    setRequestData,
    handleRfidUsedClick,
    handleAllClick,
    handleGenericConnectedClick,
    handleGenericNotConnectedClick,
    handleRfidAllClick,
    handleRfidUnUsedClick,
    handleWeighBridgeConnectedClick,
    handleWeighBridgeNotConnectedClick,
    onMomnetumScrollBegin,
    onScrollEndDrag,
    onMomnetumScrollEnd,
  } = DashBoardHook();
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        buCode={buCode}
        userLogo={'account-circle'}
        title={'Dashboard'}
        translateY={headerTranslate}
        onSearchPress={undefined}
        onFilterPress={undefined}
        searchIcon={undefined}
        filterIcon={undefined}
        filterCount={undefined}
      />
      {
        isLoading ?
          (
            <View style={{ flex: 1, backgroundColor: colors.white }}>
              <SequentialBouncingLoader />
            </View>
          ) :
          <View style={{ flex: 1 }}>
            <DashboardComp
              spotListData={spotListData}
              eventLogsByTime={eventLogsByTime}
              WeighBridgeDisConnected={WeighBridgeDisConnected}
              WeighBridgeConnected={WeighBridgeConnected}
              genericDisConnected={genericDisConnected}
              genericConnected={genericConnected}
              rfidCount={rfidCount}
              rfidUnUsedCount={rfidUnUsedCount}
              navigation={navigation}
              rfidUsedCount={rfidUsedCount}
              topRecentLogs={topRecentLogs}
              handleScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}

              setModalVisible={setModalVisible}
              setRequestData={setRequestData}
              handleRfidUsedClick={handleRfidUsedClick}
              handleAllClick={handleAllClick}
              handleGenericConnectedClick={handleGenericConnectedClick}
              handleGenericNotConnectedClick={handleGenericNotConnectedClick}
              handleRfidAllClick={handleRfidAllClick}
              handleRfidUnUsedClick={handleRfidUnUsedClick}
              handleWeighBridgeConnectedClick={handleWeighBridgeConnectedClick}
              handleWeighBridgeNotConnectedClick={handleWeighBridgeNotConnectedClick}
              buCode={buCode} isConnected={isConnected}
              onMomentumScrollBegin={onMomnetumScrollBegin}
              onMomentumScrollEnd={onMomnetumScrollEnd}
              onScrollEndDrag={onScrollEndDrag} />
          </View>
      }

    </View>
  );

}

export default DashBoard;
