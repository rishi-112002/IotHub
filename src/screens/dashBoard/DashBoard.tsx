/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import colors from '../../assets/color/colors';
import EventLogsList from '../../component/EventLog/EventLogList';
import DashBoardHook from '../../CustomHooks/dashBordEffect/DashBoardHooks';
import DashBoardSubHeader from '../../component/dashBoardCom/DashBoardSubHeader';
import DashBoardSubView from '../../component/dashBoardCom/DashBoardSubView';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import {useNetwork} from '../../contextApi/NetworkContex';
function DashBoard() {
  const {isConnected} = useNetwork();

  const {
    translateY,
    buCode,
    spotListData,
    eventLogsByTime,
    connectedCount,
    disconnectedCount,
    WeighBridgeDisConnected,
    WeighBridgeConnected,
    genericDisConnected,
    genericConnected,
    rfidCount,
    rfidUnUsedCount,
    navigation,
    rfidUsedCount,
    topRecentLogs,
    setModalVisible,
    setRequestData,
    handleRfidUsedClick,
    handleAllClick,
    handleConnectedClick,
    handleGenericConnectedClick,
    handleGenericNotConnectedClick,
    handleNotConnectedClick,
    handleRfidAllClick,
    handleRfidUnUsedClick,
    handleWeighBridgeConnectedClick,
    handleWeighBridgeNotConnectedClick,
  } = DashBoardHook();
  const [isLoading, setIsLoading] = useState(true);

  // Show loader for 3 seconds
  useEffect(() => {
    console.log('Dashboard');
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <CustomHeader
        buCode={buCode}
        userLogo={'account-circle'}
        title={'DashBoard'}
        translateY={translateY}
        onSearchPress={undefined}
        onFilterPress={undefined}
        searchIcon={undefined}
        filterIcon={undefined}
        filterCount={undefined}
      />
      {/* Card Section */}
      {isConnected ? (
        !isLoading ? (
          <View style={styles.container}>
            {/* LiveSpot Section */}
            <View style={{marginBottom: 15}}>
              <DashBoardSubHeader
                heading="LiveSpot"
                subHeading="Total count :-"
                count={spotListData.length}
                iconPath={require('../../assets/icons/LiveSpots.png')}
                onPress={handleAllClick}
              />
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  columnGap: 15, // Gap between items
                }}
                showsHorizontalScrollIndicator={false}
                horizontal>
                <DashBoardSubView
                  subHeader="Connected"
                  subHeaderCount={connectedCount}
                  subHeadingLeft="Generic-spot"
                  subHeadingRight="WeighBridge-spot"
                  subHeadingLeftCount={genericConnected}
                  subHeadingRightCount={WeighBridgeConnected}
                  onPress={handleConnectedClick}
                  onPressLeft={handleGenericConnectedClick}
                  onPressRight={handleWeighBridgeConnectedClick}
                  backGroundColor={colors.greenSoftneer}
                />
                <DashBoardSubView
                  subHeader="Not-Connected"
                  subHeaderCount={disconnectedCount}
                  subHeadingLeft="Generic-spot"
                  subHeadingRight="WeighBridge-spot"
                  subHeadingLeftCount={genericDisConnected}
                  subHeadingRightCount={WeighBridgeDisConnected}
                  onPress={handleNotConnectedClick}
                  onPressLeft={handleGenericNotConnectedClick}
                  onPressRight={handleWeighBridgeNotConnectedClick}
                  backGroundColor={colors.redSoftner}
                />
              </ScrollView>
            </View>

            {/* RFID Section */}
            <View style={{flex: 0.4}}>
              <DashBoardSubHeader
                heading="Rf-Id"
                subHeading="Total rfid :-"
                count={rfidCount}
                iconPath={require('../../assets/icons/rfid.png')}
                onPress={handleRfidAllClick}
              />
              <View style={{marginEnd: 15, flex: 1}}>
                <DashBoardSubView
                  subHeader=""
                  subHeaderCount=""
                  subHeadingLeft="Rfid-used"
                  subHeadingRight="Rfid-unused"
                  subHeadingLeftCount={rfidUsedCount}
                  subHeadingRightCount={rfidUnUsedCount}
                  onPress={undefined}
                  onPressLeft={handleRfidUsedClick}
                  onPressRight={handleRfidUnUsedClick}
                  backGroundColor={colors.white}
                />
              </View>
            </View>

            {/* Event Logs Section */}
            <View style={{flex: 1}}>
            <DashBoardSubHeader
              heading="Event Logs"
              subHeading="Total Event :-"
              count={eventLogsByTime.length || 0}
              iconPath={require('../../assets/icons/eventLogs.png')}
              onPress={() =>
                navigation.navigate('Drawer', {screen: 'AllEventLogsScreen'})
              }
            />
            <View style={{flex: 1, marginBottom: 60}}>
              <EventLogsList
                data={topRecentLogs}
                setModal={setModalVisible}
                setRequestData={setRequestData}
                onScroll={undefined}
              />
            </View>
          </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <SequentialBouncingLoader />
          </View>
        )
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <Text>No Internet Connection</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 70,
  },
});
export default DashBoard;
