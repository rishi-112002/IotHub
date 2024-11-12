import React, { } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../reuseableComponent/header/CustomHeader";
import fontSizes from "../../assets/fonts/FontSize";
import CustomIcon from "../../reuseableComponent/customIcons/CustomIcon";
import colors from "../../assets/color/colors";
import EventLogsList from "../../component/EventLog/EventLogList";
import DashBoardHook from "../../CustomHooks/dashBordEffect/DashBoardHooks";
import SequentialBouncingLoader from "../../reuseableComponent/loader/BallBouncingLoader";

function DashBoard() {
    const { translateY,
        setModalVisible,
        setRequestData,
        buCode,
        spotListData,
        eventLogsByTime,
        connectedCount,
        disconnectedCount,
    } = DashBoardHook()
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


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{ flexDirection: 'row', columnGap: 10, flex: 1 }}>
                            <CustomIcon iconPath={require("../../assets/icons/LiveSpots.png")} onPress={undefined} />

                            <View style={{ flex: 1 }}>
                                <Text style={styles.cardTitle}>LiveSpot</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    <Text style={{ fontSize: fontSizes.smallText }} >Total count :- </Text>
                                    <Text style={{ color: colors.darkblack, fontSize: fontSizes.text }}>   {spotListData.length}</Text>

                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.1, alignItems: 'center' }}>
                            <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={undefined} />

                        </View>



                    </View>


                    <View style={styles.row}>
                        <View style={styles.infoBox}>
                            <Text style={{
                                fontSize: fontSizes.smallText,
                                color: '#15803D',
                                marginBottom: 5,
                            }}>Connected</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <Text style={{
                                    fontSize: fontSizes.header,
                                    fontWeight: 'bold',
                                    color: '#15803D',
                                }}>{connectedCount}</Text>
                                <View style={{ marginTop: 10, backgroundColor: colors.white, borderRadius: 10, padding: 2, elevation: 2 }}>
                                    <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={undefined} />
                                </View>
                            </View>

                        </View>

                        <View style={styles.infoBox}>
                            <Text style={{
                                fontSize: fontSizes.smallText,
                                color: '#B91C1C',
                                marginBottom: 5,
                            }}>Disconnected</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                                <Text style={{
                                    fontSize: fontSizes.header,
                                    fontWeight: 'bold',
                                    color: '#B91C1C',
                                }}>{disconnectedCount}</Text>
                                <View style={{ marginTop: 10, backgroundColor: colors.white, borderRadius: 10, padding: 2, elevation: 2 }}>
                                    <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={undefined} />
                                </View>

                            </View>
                        </View>
                    </View>
                </View>

                {/* Event Logs Card */}
                <View style={{ flex: 1, marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', columnGap: 10, flex: 1 }}>
                            <CustomIcon iconPath={require("../../assets/icons/eventLogs.png")} onPress={undefined} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.cardTitle}>Event Logs</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontSize: fontSizes.smallText }} >Today Event :- </Text>
                                    <Text style={{ color: colors.darkblack, fontSize: fontSizes.text }}>   {eventLogsByTime.length}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.1, alignItems: 'center' }}>
                            <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={undefined} />
                        </View>
                    </View>


                    <View style={{
                        flex: 1,
                        marginBottom: 40
                    }}>
                        <EventLogsList
                            data={eventLogsByTime}
                            setModal={setModalVisible}
                            setRequestData={setRequestData}
                        />
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
    bigCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20, // Adds space between cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3, // For Android shadow
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        // backgroundColor:"green",
        // padding:10
    },
    infoBox: {
        backgroundColor: '#f0f4f7',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 20,
        rowGap: 10,
        width: '45%',
    },
    infoTitle: {
        fontSize: fontSizes.smallText,
        color: colors.darkblack,
        marginBottom: 5,
    },
    infoValue: {
        fontSize: fontSizes.header,
        fontWeight: 'bold',
        color: '#007bff',
    },
    viewAll: {
        fontSize: fontSizes.text,
        fontWeight: 'bold',
        color: '#007bff',
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    cardTitle: {
        fontSize: fontSizes.header,
        color: colors.darkblack,
        fontWeight: '500',
        marginTop: -5
    },
    subTitle: {
        marginVertical: 5,
    },
    eventLogCount: {
        fontSize: fontSizes.heading,
        color: colors.blueBase,
        fontWeight: '500',
    },
    eventLogCard: {
        paddingVertical: 10,
    },
});

export default DashBoard;
