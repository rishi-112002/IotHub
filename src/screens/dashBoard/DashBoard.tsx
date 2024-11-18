import React, { } from "react";
import { StyleSheet, View } from "react-native";
import CustomHeader from "../../reuseableComponent/header/CustomHeader";
import colors from "../../assets/color/colors";
import EventLogsList from "../../component/EventLog/EventLogList";
import DashBoardHook from "../../CustomHooks/dashBordEffect/DashBoardHooks";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppNavigationParams } from "../../navigation/NavigationStackList";
import DashBoardSubHeader from "../../component/dashBoardCom/DashBoardSubHeader";
import DashBoardSubView from "../../component/dashBoardCom/DashBoardSubView";
function DashBoard() {
    const { translateY,
        setModalVisible,
        setRequestData,
        buCode,
        spotListData,
        eventLogsByTime,
        connectedCount,
        disconnectedCount,
        WeighBridgeDisConnected,
        WeighBridgeConnected,
        genericDisConnected,
        genericConnected
    } = DashBoardHook()
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

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

                <View style={{ marginBottom: 10 }}>
                    <DashBoardSubHeader navigation={navigation} heading={"LiveSpot"} subHeading={"Total count :-"} count={spotListData.length} />
                    <View style={{ rowGap: 15 }}>
                        <DashBoardSubView navigation={navigation} subHeader={"Connected"} subHeaderCount={connectedCount} subHeadingLeft={"Generic-spot"} subHeadingRight={"WeighBridge-spot"}
                            subHeadingLeftCount={genericConnected} subHeadingRightCount={WeighBridgeConnected} />
                        <DashBoardSubView navigation={navigation} subHeader={"Not-Connected"} subHeaderCount={disconnectedCount} subHeadingLeft={"Generic-spot"}
                            subHeadingRight={"WeighBridge-spot"}
                            subHeadingLeftCount={genericDisConnected} subHeadingRightCount={WeighBridgeDisConnected} />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <DashBoardSubHeader navigation={navigation} heading={"Rf-Id"} subHeading={"Total rfid :-"} count={eventLogsByTime.length} />
                </View>
                <View style={{ flex: 1, marginVertical: 20 }}>
                    <DashBoardSubHeader navigation={navigation} heading={"Event Logs"} subHeading={"Today Event :-"} count={eventLogsByTime.length} />
                    <View style={{
                        flex: 1,
                        marginBottom: 40
                    }}>
                        <EventLogsList
                            data={eventLogsByTime}
                            setModal={setModalVisible}
                            setRequestData={setRequestData}
                            onScroll={undefined} />
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 70,
    },
});

export default DashBoard;
