import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import CustomIcon from "../../reuseableComponent/customIcons/CustomIcon";
import fontSizes from "../../assets/fonts/FontSize";
import colors from "../../assets/color/colors";
import { ImagePath, Strings } from "../../assets/constants/Lable";

function SpotDataByTypeSubComponent(props: { height: any, handleDelete: any, item: any, navigate: any, navigation: any }) {
    const { item, handleDelete, height, navigate, navigation } = props
    return (
        <View style={{ flex: 1, height: height }}>
            <View style={styles.spotContainer}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('SpotDetailScreen', { data: item })
                    }>
                    <View style={styles.row}>
                        <View style={{ flex: 1, gap: 5 }}>

                            <Text style={styles.spotTitle}>{item.name}</Text>
                            <View style={{
                                backgroundColor: item.active ? colors.MintGreen : colors.BlushPink,
                                borderRadius: 20,
                                width: item.active ? "28%" : "38%",
                                paddingHorizontal: 5
                            }}>
                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color: item.active ? colors.greenBase : colors.redBase,
                                        },
                                    ]}>
                                    {item.active ? Strings.CONNECTED : Strings.NOT_CONNECTED}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.statusContainer}>

                            <View style={styles.iconContainer}>
                                <CustomIcon
                                    iconPath={ImagePath.DELETE}
                                    onPress={() => handleDelete(item.id)}
                                />
                                <CustomIcon
                                    iconPath={ImagePath.EDIT}
                                    onPress={() => navigate(item.id)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', columnGap: 50, marginTop: 5 }}>
                        <View>
                            <Text style={styles.infoText}>{Strings.VALID_ID} </Text>
                            <Text style={styles.value}>
                                {item.validDiDirA}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.infoText}>{Strings.EVENT}</Text>
                            <Text style={styles.value}>
                                {item.events}
                            </Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    spotContainer: {
        flex: 1,
        paddingStart: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    spotTitle: {
        fontSize: fontSizes.title,
        color: colors.SecondaryTextColor,
    },
    statusContainer: {
        flexDirection: 'row',
        columnGap: 10,
    },
    activeStatus: {
        backgroundColor: '#DCFCE7',
    },
    inactiveStatus: {
        backgroundColor: '#FEF2F2',
    },
    statusText: {
        fontSize: fontSizes.smallText,
        color: colors.SecondaryTextColor,
    },
    value: {
        fontSize: fontSizes.smallText,
        color: colors.SecondaryTextColor,
    },
    activeText: {
        width: "13%",
        backgroundColor: colors.greeenLightest,
        color: '#15803D',
        fontSize: fontSizes.vSmallText,
    },
    inactiveText: {
        width: "16%",
        backgroundColor: colors.redLightest,
        color: '#B91C1C',
        fontSize: fontSizes.vSmallText,
    },
    iconContainer: {
        flexDirection: 'row',
        columnGap: 10,
    },
    infoText: {
        fontSize: fontSizes.smallText,
        color: colors.HelperTextColor,
    },
    divider: {
        height: 1,
        marginVertical: 15,
        backgroundColor: '#d4d4d4',
    },
});

export default SpotDataByTypeSubComponent;