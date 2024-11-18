import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "../../reuseableComponent/customIcons/CustomIcon";
import colors from "../../assets/color/colors";
import fontSizes from "../../assets/fonts/FontSize";

function DashBoardSubHeader(props: { navigation: any, heading: string, subHeading: string, count: any }) {
    const { heading, navigation, subHeading, count } = props
    return (
        <View>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                onPress={() => navigation.navigate('LiveSpots', { screen: "HomeScreen", types: "all" })}>
                <View style={{ flexDirection: 'row', columnGap: 10, flex: 1 }}>
                    <CustomIcon iconPath={require("../../assets/icons/LiveSpots.png")} onPress={undefined} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>{heading}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Text style={{ fontSize: fontSizes.smallText }} >{subHeading} </Text>
                            <Text style={{ color: colors.darkblack, fontSize: fontSizes.text }}>
                                {count}</Text>

                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.1, alignItems: 'center' }}>
                    <CustomIcon iconPath={require("../../assets/icons/arrowRightMedium.png")} onPress={undefined} />

                </View>
            </TouchableOpacity>
        </View>
    )


}
const styles = StyleSheet.create({
    cardTitle: {
        fontSize: fontSizes.header,
        color: colors.darkblack,
        fontWeight: '500',
        marginTop: -5
    },
})
export default DashBoardSubHeader;