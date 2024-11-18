import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../assets/color/colors";
import { Colors2 } from "../../assets/color/Colors2";
import fontSizes from "../../assets/fonts/FontSize";
import CustomIcon from "../../reuseableComponent/customIcons/CustomIcon";
import { StyleSheet } from "react-native";

function DashBoardSubView(props: {
    onPress: any,
    onPressLeft: any,
    onPressRight: any,
    backGroundColor:string,
    subHeader: string, subHeaderCount: any,
    subHeadingLeft: string, subHeadingRight: string, subHeadingLeftCount: any, subHeadingRightCount: any
}) {
    const { onPress, onPressLeft, onPressRight, subHeader, subHeaderCount, subHeadingLeft, subHeadingLeftCount,backGroundColor, subHeadingRight, subHeadingRightCount } = props
    return (
        <View style={styles.column}>


            <View style={{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: backGroundColor, borderRadius: 20, rowGap: 10, padding: 7 }}>
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


                        <View style={{ margin: 5, backgroundColor: colors.white, borderRadius: 10, padding: 2, elevation: 2 }}>
                            <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={onPress} />
                        </View>

                    </View>
                </TouchableOpacity>}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>

                    <TouchableOpacity style={{
                        backgroundColor: "#d1d8de",
                        borderRadius: 20,
                        padding: 10,
                        rowGap: 10,
                        width: "45%",
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        alignContent: 'center'
                    }} onPress={onPressLeft}>

                        <Text style={{
                            fontSize: fontSizes.smallText,
                            color: Colors2.SecondaryTextColor

                        }}>{subHeadingLeft}</Text>


                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                            <Text style={{
                                fontSize: fontSizes.header,
                                fontWeight: 'bold',
                                color: Colors2.SecondaryTextColor

                            }}>{subHeadingLeftCount}
                            </Text>
                            <View style={{ margin: 5, backgroundColor: colors.white, borderRadius: 10, padding: 2, elevation: 2 }}>
                                <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={onPressLeft} />
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#d1d8de",
                        borderRadius: 20,
                        padding: 10,
                        rowGap: 10,
                        width: "45%",
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        alignContent: 'center'
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
                            <View style={{ margin: 5, backgroundColor: colors.white, borderRadius: 10, padding: 2, elevation: 2 }}>
                                <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={onPressRight} />
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    column: {
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