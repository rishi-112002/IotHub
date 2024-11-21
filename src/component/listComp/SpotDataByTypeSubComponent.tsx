import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import CustomIcon from "../../reuseableComponent/customIcons/CustomIcon";
import fontSizes from "../../assets/fonts/FontSize";
import colors from "../../assets/color/colors";
import { Colors2 } from "../../assets/color/Colors2";

function SpotDataByTypeSubComponent(props: { height: any, handleDelete: any, item: any, navigate: any, navigation: any }) {
    const { item, handleDelete, height, navigate, navigation } = props
    return (
        <View style={{ flex: 1  , height:height}}>
            <View style={styles.spotContainer}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('SpotDetailScreen', { data: item })
                    }>
                    <View style={styles.row}>
                        <Text style={styles.spotTitle}>{item.name}</Text>
                        <View style={styles.statusContainer}>

                            <View style={styles.iconContainer}>
                                <CustomIcon
                                    iconPath={require('../../assets/icons/deleteIcon.png')}
                                    onPress={() => handleDelete(item.id)}
                                />
                                <CustomIcon
                                    iconPath={require('../../assets/icons/Edit--Streamline-Tabler.png')}
                                    onPress={() => navigate(item.id)}
                                />
                            </View>
                        </View>
                    </View>

                    <Text
                        style={
                            [item.active ? styles.activeText : styles.inactiveText,
                            { borderRadius: 20, paddingStart: 5 }]
                        }>
                        {item.active ? 'Active' : 'In-active'}
                    </Text>
                    <View style={{ flexDirection: 'row', columnGap: 50, marginTop: 5 }}>
                        <View>
                            <Text style={styles.infoText}>ValidId </Text>
                            <Text style={styles.value}>
                                {item.validDiDirA}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.infoText}>Event</Text>
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
        color: Colors2.SecondaryTextColor,
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
    value: {
        fontSize: fontSizes.smallText,
        color: Colors2.SecondaryTextColor,
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
        color: Colors2.HelperTextColor,
    },
    divider: {
        height: 1,
        marginVertical: 15,
        backgroundColor: '#d4d4d4',
    },
});

export default SpotDataByTypeSubComponent;