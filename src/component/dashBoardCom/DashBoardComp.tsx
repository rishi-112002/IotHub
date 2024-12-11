import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../assets/color/colors";
import EventLogsList from "../EventLog/EventLogList";
import DashboardCardView from "./DashBoardCardView";
import { ScrollView } from 'react-native-virtualized-view';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SequentialBouncingLoader from "../../reuseableComponent/loader/BallBouncingLoader";
import { Strings } from "../../assets/constants/Lable";
import { NoInternetScreen } from "../../reuseableComponent/defaultScreen/NoInternetScreen";

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
    isConnected: any,
    onMomentumScrollBegin: any,
    onMomentumScrollEnd: any,
    onScrollEndDrag: any
}) {
    const {
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
        isConnected } = props

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView
                onScroll={handleScroll}
                style={{ flex: 1 }}
            >

                <View style={{ backgroundColor: colors.white, flex: 1 }}>
                    {/* Card Section */}
                    {isConnected ? (
                        <View style={styles.container}>
                            {/* LiveSpot Section */}
                            <View style={{ elevation: 1, padding: 5, backgroundColor: colors.white, borderRadius: 20, flex: 1 }}>

                                <DashboardCardView
                                    connectedCards={[{
                                        name: Strings.GENERIC, count: genericConnected || 0, icon: "",
                                        onPress: handleGenericConnectedClick, countColor: colors.greenBase,
                                        backgroundColor: colors.greenSoftneer
                                    },
                                    {
                                        name: Strings.WEIGHBRIDGE, count: WeighBridgeConnected || 0, icon: "",
                                        onPress: handleWeighBridgeConnectedClick, countColor: colors.greenBase,
                                        backgroundColor: colors.greenSoftneer
                                    }]}
                                    notConnectedCards={[{
                                        name: Strings.GENERIC, count: genericDisConnected || 0, icon: "",
                                        onPress: handleGenericNotConnectedClick, countColor: colors.redBase,
                                        backgroundColor: colors.redSoftner
                                    },
                                    {
                                        name: Strings.WEIGHBRIDGE, count: WeighBridgeDisConnected || 0, icon: "",
                                        onPress: handleWeighBridgeNotConnectedClick, countColor: colors.redBase,
                                        backgroundColor: colors.redSoftner
                                    }]} heading={Strings.SPOTS} totalCount={spotListData.length}
                                    ViewAllPress={handleAllClick} type={'connectivity'} card={[]} />
                            </View>
                            {/* RFID Section */}
                            <View style={{ elevation: 1, padding: 5, backgroundColor: colors.white, borderRadius: 20, flex: 1 }}>
                                <DashboardCardView
                                    heading={Strings.RFID_READERS}
                                    totalCount={rfidCount}
                                    ViewAllPress={handleRfidAllClick} type={'useability'}
                                    card={[{
                                        name: Strings.USED, count: rfidUsedCount || 0, icon: "",
                                        onPress: handleRfidUsedClick, countColor: colors.greenBase,
                                        backgroundColor: colors.greenSoftneer
                                    },
                                    {
                                        name: Strings.UNUSED, count: rfidUnUsedCount || 0, icon: "",
                                        onPress: handleRfidUnUsedClick, countColor: colors.redBase,
                                        backgroundColor: colors.redSoftner
                                    }]} connectedCards={[]} notConnectedCards={[]} />
                            </View>

                            {/* Event Logs Section */}
                            <View
                                style={{ elevation: 1, padding: 5, backgroundColor: colors.white, borderRadius: 20, flex: 1 }}>

                                <DashboardCardView
                                    heading={Strings.RECENT_EVENT_LOGS}
                                    totalCount={eventLogsByTime ? eventLogsByTime.length : 0}
                                    ViewAllPress={() => navigation.navigate('Drawer', { screen: 'AllEventLogsScreen' })}
                                    type={'eventLog'}
                                    connectedCards={[]}
                                    notConnectedCards={[]}
                                    card={[]} />
                                <View style={{ flex: 1 }}>
                                    {topRecentLogs ?
                                        <EventLogsList
                                            data={topRecentLogs}
                                            setModal={setModalVisible}
                                            setRequestData={setRequestData}
                                            onScroll={undefined}
                                            scrollEnabled={false} />
                                        :
                                        <SequentialBouncingLoader />

                                    }
                                </View>
                            </View>
                        </View>
                    )
                        : (
                            <NoInternetScreen />
                        )}
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "3%",
        paddingTop: "14%",
        height: "14%",
        rowGap: 20
    },
});
export default DashboardComp;