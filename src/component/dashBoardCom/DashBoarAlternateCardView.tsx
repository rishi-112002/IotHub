import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../assets/color/colors";
import { Colors2 } from "../../assets/color/Colors2";
import fontSizes from "../../assets/fonts/FontSize";
import { StyleSheet } from "react-native";

function DashBoardSubView(props: {
    onPress: any,
    onPressLeft: any,
    onPressRight: any,
    backGroundColor: string,
    subHeader: string, subHeaderCount: any,
    subHeadingLeft: string, subHeadingRight: string, subHeadingLeftCount: any, subHeadingRightCount: any
}) {
    const { onPress, onPressLeft, onPressRight, subHeader, subHeaderCount, subHeadingLeft, subHeadingLeftCount, backGroundColor, subHeadingRight, subHeadingRightCount } = props
    return (
        <View style={styles.column}>


            <View style={subHeader ? {
                flexDirection: 'column', justifyContent: 'space-between', backgroundColor: backGroundColor,
                borderRadius: 20, padding: 10
            } : { marginTop: 0 }}>
                {subHeader && <TouchableOpacity style={{

                    borderRadius: 15,
                    paddingHorizontal: 10,
                    rowGap: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignContent: 'center'
                }} onPress={onPress}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', columnGap: 10, justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: fontSizes.smallText,
                            color: subHeader === "Connected" ? '#15803D' : colors.redBase,
                        }}>{subHeader}</Text>
                        <Text style={{
                            fontSize: fontSizes.header,
                            fontWeight: 'bold',
                            color: subHeader === "Connected" ? '#15803D' : colors.redBase,
                        }}>{subHeaderCount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>


                        {/* <View style={{ margin: 5, backgroundColor: colors.white, borderRadius: 10, padding: 2, elevation: 2 }}>
                            <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={onPress} />
                        </View> */}

                    </View>
                </TouchableOpacity>}

                <View style={{ flexDirection: 'row', gap: 10, paddingEnd: 20, paddingVertical: 10 }}>

                    <TouchableOpacity style={{
                        backgroundColor: "#f1f4f8",
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        rowGap: 10,
                        width: "55%",
                        justifyContent: 'space-between',
                        flexDirection: 'column',

                    }} onPress={onPressLeft}>

                        <View style={{ flexDirection: 'row', columnGap: 10,}}>
                            <Text style={{
                                fontSize: fontSizes.smallText,
                                color: Colors2.SecondaryTextColor,
                                // justifyContent: "center",
                                // alignContent: 'center',
                                // alignItems: "center",
                                textAlign: "center"
                                // backgroundColor:"pink"
                            }}>{subHeadingLeft}</Text>
                            <Text style={{
                                fontSize: fontSizes.header,
                                fontWeight: 'bold',
                                color: Colors2.SecondaryTextColor

                            }}>{subHeadingLeftCount}
                            </Text>
                            {/* <View style={{ margin: 5, backgroundColor: colors.white, borderRadius: 10, padding: 2, elevation: 2 }}>
                                <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={onPressLeft} />
                            </View> */}

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#f1f4f8",
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        rowGap: 10,
                        width: "55%",
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }} onPress={onPressRight}>

                        <Text style={{
                            fontSize: fontSizes.smallText,
                            color: Colors2.SecondaryTextColor

                        }}>{subHeadingRight}</Text>


                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                            <Text style={{
                                fontSize: fontSizes.header,
                                fontWeight: 'bold',
                                color: Colors2.SecondaryTextColor

                            }}>{subHeadingRightCount}</Text>
                            {/* <View style={{ margin: 5, backgroundColor: colors.white, borderRadius: 10, padding: 2, elevation: 2 }}>
                                <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={onPressRight} />
                            </View> */}

                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    column: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        rowGap: 10
    },
    infoBox: {
        backgroundColor: '#f0f4f7',
        borderRadius: 15,
        paddingHorizontal: 10,
        rowGap: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center'
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

export default DashBoardSubView;