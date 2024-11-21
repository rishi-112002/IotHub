/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import colors from '../../assets/color/colors';
import EventLogsList from '../../component/EventLog/EventLogList';
import DashBoardHook from '../../CustomHooks/dashBordEffect/DashBoardHooks';
import DashBoardSubHeader from '../../component/dashBoardCom/DashBoardSubHeader';
import DashBoardSubView from '../../component/dashBoardCom/DashBoardSubView';
function DashBoard() {
    const { translateY,
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


    return (

        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <CustomHeader
                buCode={buCode}
                userLogo={'account-circle'}
                title={'IotHub'}
                translateY={translateY}
            />

            {/* Card Section */}
            <View style={styles.container}>

                <View style={{ marginBottom: 15 }}>
                    <DashBoardSubHeader
                        heading={'LiveSpot'} subHeading={'Total count :-'}
                        count={spotListData.length}
                        iconPath={require('../../assets/icons/LiveSpots.png')}
                        onPress={handleAllClick} />
                    <ScrollView contentContainerStyle={{
                        flexDirection: 'row', // Arrange items in a row
                        columnGap: 15, // Add padding if needed
                    }}
                        showsHorizontalScrollIndicator={true} // Show horizontal scroll indicator
                        scrollEnabled={true}
                        horizontal={true} >
                        <DashBoardSubView subHeader={'Connected'} subHeaderCount={connectedCount} subHeadingLeft={'Generic-spot'} subHeadingRight={'WeighBridge-spot'}
                            subHeadingLeftCount={genericConnected} subHeadingRightCount={WeighBridgeConnected}
                            onPress={handleConnectedClick}
                            onPressLeft={handleGenericConnectedClick}
                            onPressRight={handleWeighBridgeConnectedClick} backGroundColor={colors.greeenLightest} />
                        <DashBoardSubView subHeader={'Not-Connected'} subHeaderCount={disconnectedCount} subHeadingLeft={'Generic-spot'}
                            subHeadingRight={'WeighBridge-spot'}
                            subHeadingLeftCount={genericDisConnected}
                            subHeadingRightCount={WeighBridgeDisConnected}
                            onPress={handleNotConnectedClick}
                            onPressLeft={handleGenericNotConnectedClick}
                            onPressRight={handleWeighBridgeNotConnectedClick}
                            backGroundColor={colors.redLightest} />
                    </ScrollView>
                </View>
                <View style={{ flex: 0.4 }}>
                    <DashBoardSubHeader heading={'Rf-Id'} subHeading={'Total rfid :-'} count={rfidCount} iconPath={require('../../assets/icons/rfid.png')}
                        onPress={handleRfidAllClick} />
                    <View style={{ marginEnd: 15, flex: 1 }}>
                        <DashBoardSubView
                            subHeader={''}
                            subHeaderCount={''}
                            subHeadingLeft={'Rfid-used'}
                            subHeadingRight={'Rfid-unused'}
                            subHeadingLeftCount={rfidUsedCount}
                            subHeadingRightCount={rfidUnUsedCount}
                            onPress={undefined}
                            onPressLeft={handleRfidUsedClick}
                            onPressRight={handleRfidUnUsedClick}
                            backGroundColor={'#f0f4f7'} />

                    </View>

                </View>
                <View style={{ flex: 1 }}>
                    <DashBoardSubHeader heading={'Event Logs'} subHeading={'Today Event :-'} count={eventLogsByTime.length}
                        iconPath={require('../../assets/icons/eventLogs.png')}
                        onPress={() => navigation.navigate('AllEventLogsScreen')} />

                    <View style={{
                        flex: 1,
                        marginBottom: 40,
                        marginTop: -10,
                    }}>
                        <EventLogsList
                            data={eventLogsByTime}
                            setModal={setModalVisible}
                            setRequestData={setRequestData}
                            onScroll={undefined} />
                    </View>
                </View>

            </View>
        </View >
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
