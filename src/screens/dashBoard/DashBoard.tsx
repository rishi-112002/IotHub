/* eslint-disable react-native/no-inline-styles */

import React, { } from 'react';
import { View } from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import DashBoardHook from '../../CustomHooks/dashBordEffect/DashBoardHooks';
import { useNetwork } from '../../contextApi/NetworkContex';
import DashboardComp from '../../component/dashBoardCom/DashBoardComp';
function DashBoard() {
  const { isConnected } = useNetwork();

  const {
   headerTranslate,
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
    handleScroll,
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
    onMomnetumScrollEnd
  } = DashBoardHook();


  return (
    <View >
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
        handleScroll={handleScroll}
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
        isLoading={isLoading}
        buCode={buCode} isConnected={isConnected} 
        onMomentumScrollBegin={onMomnetumScrollBegin} 
        onMomentumScrollEnd={onMomnetumScrollEnd} 
        onScrollEndDrag={onScrollEndDrag} />
      </View>
  );
}

export default DashBoard;

//segmented button