import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../assets/color/colors";
import SequentialBouncingLoader from "../../reuseableComponent/loader/BallBouncingLoader";
import EventLogsList from "../EventLog/EventLogList";
import DashboardCardView from "./DashBoardCardView";
import { ScrollView } from 'react-native-virtualized-view';

function DashboardComp(props: {
    buCode: any,
    spotListData: any,
    eventLogsByTime: any,
    WeighBridgeDisConnected: any,
    WeighBridgeConnected: any,
    genericDisConnected: any,
    genericConnected: any,
    rfidCount: any,
    rfidUnUsedCount: any,
    navigation: any,
    rfidUsedCount: any,
    topRecentLogs: any,
    handleScroll: any,
    setModalVisible: any,
    setRequestData: any,
    handleRfidUsedClick: any,
    handleAllClick: any,
    handleGenericConnectedClick: any,
    handleGenericNotConnectedClick: any,
    handleRfidAllClick: any,
    handleRfidUnUsedClick: any,
    handleWeighBridgeConnectedClick: any,
    handleWeighBridgeNotConnectedClick: any,
    isLoading: any,
    isConnected: any,
    onMomentumScrollBegin: any,
    onMomentumScrollEnd: any,
    onScrollEndDrag: any
}) {
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
        isLoading,
        isConnected,
        onMomentumScrollBegin,
        onMomentumScrollEnd,
        onScrollEndDrag
    } = props

    return (
        <ScrollView onScroll={handleScroll} onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            nestedScrollEnabled={true}
            onScrollEndDrag={onScrollEndDrag} scrollEventThrottle={16} style={{ flexGrow: 1 }}>

            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {/* Card Section */}
                {isConnected ? (
                    !isLoading ? (
                        <View style={styles.container}>
                            {/* LiveSpot Section */}
                            <View style={{ elevation: 1, padding: 5, backgroundColor: colors.white, borderRadius: 20 }}>

                                <DashboardCardView
                                    connectedCards={[{
                                        name: "Generic", count: genericConnected, icon: "",
                                        onPress: handleGenericConnectedClick, countColor: colors.greenBase,
                                        backgroundColor: colors.greenSoftneer
                                    },
                                    {
                                        name: "Weighrbidge", count: WeighBridgeConnected, icon: "",
                                        onPress: handleWeighBridgeConnectedClick, countColor: colors.greenBase,
                                        backgroundColor: colors.greenSoftneer
                                    }]}
                                    notConnectedCards={[{
                                        name: "Generic", count: genericDisConnected, icon: "",
                                        onPress: handleGenericNotConnectedClick, countColor: colors.redBase,
                                        backgroundColor: colors.redSoftner
                                    },
                                    {
                                        name: "Weighbridge", count: WeighBridgeDisConnected, icon: "",
                                        onPress: handleWeighBridgeNotConnectedClick, countColor: colors.redBase,
                                        backgroundColor: colors.redSoftner
                                    }]} heading={'Spots'} totalCount={spotListData.length}
                                    ViewAllPress={handleAllClick} type={'connectivity'} card={[]} />
                            </View>
                            {/* RFID Section */}
                            <View style={{ elevation: 1, padding: 5, backgroundColor: colors.white, borderRadius: 20 }}>
                                <DashboardCardView
                                    heading={'RFID Readers'}
                                    totalCount={rfidCount}
                                    ViewAllPress={handleRfidAllClick} type={'useability'}
                                    card={[{
                                        name: "Used", count: rfidUsedCount, icon: "",
                                        onPress: handleRfidUsedClick, countColor: colors.greenBase,
                                        backgroundColor: colors.greenSoftneer
                                    },
                                    {
                                        name: "Unused", count: rfidUnUsedCount, icon: "",
                                        onPress: handleRfidUnUsedClick, countColor: colors.redBase,
                                        backgroundColor: colors.redSoftner
                                    }]} connectedCards={[]} notConnectedCards={[]} />
                            </View>

                            {/* Event Logs Section */}
                            <View style={{ elevation: 1, padding: 5, backgroundColor: colors.white, borderRadius: 20, flex: 1 }}>

                                <DashboardCardView
                                    heading={'Recent Event Logs'}
                                    totalCount={eventLogsByTime ? eventLogsByTime.length : 0}
                                    ViewAllPress={() => navigation.navigate('Drawer', { screen: 'AllEventLogsScreen' })}
                                    type={'eventLog'}
                                    connectedCards={[]}
                                    notConnectedCards={[]}
                                    card={[]} />
                                <View style={{ flex: 1, marginBottom: "20%" }}>
                                    {topRecentLogs &&
                                        <EventLogsList
                                            data={topRecentLogs}
                                            setModal={setModalVisible}
                                            setRequestData={setRequestData}
                                            onScroll={undefined}
                                            scrollEnabled={false} />
                                    }
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            <SequentialBouncingLoader />
                        </View>
                    )
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                        <Text>No Internet Connection</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 70,
        height: "15%",
        rowGap: 20
    },
});
export default DashboardComp;