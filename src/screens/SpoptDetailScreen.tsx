import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fontSizes from "../assets/fonts/FontSize";
import colors from "../assets/color/colors";
import { useSelector } from "react-redux";
import { RootState } from "../reducer/Store";
import { useLayoutEffect } from "react";
import { AppNavigationParams } from "../navigation/NavigationStackList";
import React from "react";
import CustomMenu from "../reuseableComponent/menuOptions/CustomMenu";

// Defining the types for the data structure
interface Display {
    name: string;
    ip: string;
    type: string;
    version: number;
}

interface Reader {
    name: string;
    ip: string;
    model: string;
    type: string;
}

interface SpotCommand {
    name: string;
    commandDirA: string;
    autoCommandEnabled: boolean;
}

interface SpotDetails {
    name: string;
    type: string;
    active: boolean;
    events: string;
    displays: Display[];
    readers: Reader[];
    spotCommands: SpotCommand[];
    securityTag: boolean;
    driverTag: boolean;
    weighbridgeEntry: boolean;
    weighbridgeName: string | null;
}

interface SpotDetailsScreenParams {
    data: SpotDetails;
    onPress: any
}

function SpotDetailScreen() {
    const route = useRoute<RouteProp<{ params: SpotDetailsScreenParams }, 'params'>>();
    const item: SpotDetails = route.params?.data;
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={styles.headerTitle}>{item?.name || "Spot Details"} </Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ marginTop: -5 }}>
                    <CustomMenu baseUrl={baseUrls} spotName={item.name} />
                </View>
            )
        });
    }, [navigation]);
    return (
        <ScrollView style={styles.container}>
            {/* Spot Information */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>Spot Information</Text>
                <View style={styles.row}>
                    <Text style={styles.label}> Name: </Text>
                    <Text style={styles.value}>{item?.name || "N/A"}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Type: </Text>
                    <Text style={styles.value}>{item?.type || "N/A"}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Active: </Text>
                    <Text style={styles.value}>{item?.active ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Events: </Text>
                    <Text style={styles.value}>{item?.events || "N/A"}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.subHeader}>Displays</Text>
                {item?.displays && item.displays.length > 0 ? (
                    item.displays.map((display, index) => (
                        <View key={index}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Display Name: </Text>
                                <Text style={styles.value}>{display.name || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>IP Address: </Text>
                                <Text style={styles.value}>{display.ip || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Type: </Text>
                                <Text style={styles.value}>{display.type || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Version: </Text>
                                <Text style={styles.value}>{display.version || "N/A"}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text>No Display Data Available</Text>
                )}
            </View>

            {/* Reader Information */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>Readers</Text>
                {item?.readers && item.readers.length > 0 ? (
                    item.readers.map((reader, index) => (
                        <View key={index}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Reader Name: </Text>
                                <Text style={styles.value}>{reader.name || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>IP Address: </Text>
                                <Text style={styles.value}>{reader.ip || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Model: </Text>
                                <Text style={styles.value}>{reader.model || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Type: </Text>
                                <Text style={styles.value}>{reader.type || "N/A"}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text>No Reader Data Available</Text>
                )}
            </View>

            {/* Spot Commands */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>Spot Commands</Text>
                {item?.spotCommands && item.spotCommands.length > 0 ? (
                    item.spotCommands.map((command, index) => (
                        <View key={index}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Command Name: </Text>
                                <Text style={styles.value}>{command.name || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Command Dir A: </Text>
                                <Text style={styles.value}>{command.commandDirA || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Auto Command Enabled: </Text>
                                <Text style={styles.value}>{command.autoCommandEnabled ? "Yes" : "No"}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text >No Spot Commands Data Available</Text>
                )}
            </View>

            {/* Additional Information */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>Additional Information</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Security Tag: </Text>
                    <Text style={styles.value}>{item?.securityTag ? "Enabled" : "Disabled"}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Driver Tag: </Text>
                    <Text style={styles.value}>{item?.driverTag ? "Enabled" : "Disabled"}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Weighbridge Entry: </Text>
                    <Text style={styles.value}>{item?.weighbridgeEntry ? "Yes" : "No"}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Weighbridge Name: </Text>
                    <Text style={styles.value}>{item?.weighbridgeName || "Not Available"}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
    },
    section: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 0.5,
        borderColor: "#979EC2"
    },

    sectionAdditionals: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 0.5,
        borderColor: "#979EC2",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    subHeader: {
        fontSize: fontSizes.heading,
        fontWeight: "500",
        color: colors.darkblack,
        marginBottom: 10,
    },
    label: {
        fontSize: fontSizes.text,
        color: "gray",
        marginBottom: 5,
        justifyContent: 'space-around'
    },
    value: {
        color: colors.darkblack,
        fontWeight: "bold",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // Adjust as needed
    },
    iconButton: {
        alignItems: "center",
        justifyContent: "center",
        columnGap: 20
    },
    iconContainer: {

    },
    iconImage: {
        width: 26,
        height: 26,
        tintColor: colors.white,
        backgroundColor: colors.iconColorDark,
        borderRadius: 5,
        marginBottom: 5,
    },

    iconText: {
        fontSize: fontSizes.smallText,
        fontWeight: "700",
        color: colors.darkblack,
    },
    headerTitle: {
        color: colors.darkblack,
        fontSize: fontSizes.heading,
    },
});

export default SpotDetailScreen;
