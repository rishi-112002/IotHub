import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../reuseableComponent/header/CustomHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer/Store";
import fontSizes from "../../assets/fonts/FontSize";
import SpotList from "../../component/SpotListComponent";
import CustomIcon from "../../reuseableComponent/customIcons/CustomIcon";
import colors from "../../assets/color/colors";

function DashBoard() {
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 60);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 60],
        outputRange: [0, -60],
    });
    const buCode = useSelector((State: RootState) => State.authentication.buCode);
    const spotListData = useSelector((state: RootState) => state.spotData.spotData);
    const connectedCount = spotListData.filter((spot: any) => spot.active === true).length;
    const disconnectedCount = spotListData.filter((spot: any) => spot.active === false).length;
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader
                buCode={buCode}
                userLogo={'account-circle'}
                title={'IotHub'}
                translateY={translateY}
            />
            {/* <View> */}
            {/* <SpotList data={spotListData} /> */}

            <View style={{ padding: 20, marginTop: 70, flex: 1 }}>
                <View style={styles.bigCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: fontSizes.header, color: colors.darkblack, fontWeight: '500' }}>
                            LiveSpot
                        </Text>
                        <CustomIcon iconPath={require("../../assets/icons/editIcon.png")} onPress={undefined} />
                    </View>
                    <Text style={{ marginVertical: 10 }}>
                        Total count {spotListData.length}
                    </Text>
                    <View style={styles.row}>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Connected </Text>
                            <Text style={styles.infoValue}>{connectedCount}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Diconnected</Text>
                            <Text style={styles.infoValue}>{disconnectedCount}</Text>
                        </View>

                        <Text style={{
                            fontSize: fontSizes.text,
                            fontWeight: 'bold',
                            color: '#007bff',
                        }}>view all</Text>

                    </View>
                </View>
            </View>
            {/* </View> */}


        </View>
    );
}

const styles = StyleSheet.create({
    bigCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3, // For Android shadow
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
    },
    infoBox: {
        backgroundColor: '#f0f4f7',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'flex-start',
        width: '30%',
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
});

export default DashBoard;
