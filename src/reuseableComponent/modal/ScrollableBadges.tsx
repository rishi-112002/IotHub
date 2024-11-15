import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ScrollableBadges(props: {
    badges: any, setSelectedSpot: any,
    setSelectedDirection: any, setSelectedFromDate: any
    setSelectedName: any, setSelectedToDate: any, setToDateValue: any, setDateFromValue: any
}) {
    const { badges, setSelectedDirection, setDateFromValue, setSelectedFromDate, setSelectedName, setSelectedSpot, setSelectedToDate, setToDateValue } = props;
    // Filter out entries where the value is empty or null
    const [badgeList, setBadgeList] = useState(badges.filter((badge: any) => badge.value));
    useEffect(() => {
        // Filter out entries where the value is empty or null and update the badgeList
        setBadgeList(badges.filter((badge: { value: any }) => badge.value));
    }, [badges]);

    const removeBadge = (key: any) => {
        setBadgeList(badgeList.filter((badge: any) => badge.key !== key));
        console.log("key ", key)
        if (key === "Spot") {
            setSelectedSpot("")
        }
        else if (key === "Direction") {
            setSelectedDirection("")
        }
        else if (key === "Name") {
            setSelectedName("")
        }
        else if (key === "From Date") {
            setSelectedFromDate("")
            setDateFromValue("")
        }
        else if (key === "To Date") {
            setSelectedToDate("")
            setToDateValue("")
        }
    };

    return (
        <ScrollView horizontal style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
            {badgeList.map((badge: any, index: any) => (
                <View key={index} style={styles.badgeContainer}>

                    <Text style={styles.badgeText}>
                        {badge.key}: {badge.value}
                    </Text>
                    <TouchableOpacity onPress={() => removeBadge(badge.key)}>
                        <Icon name="cancel" size={15} color={colors.blueBase} />
                    </TouchableOpacity>

                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: colors.white,
    },
    badgeContainer: {
        marginTop:10,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.blueBase,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginRight: 10,
        position: 'relative',
        flexDirection: 'row',
        columnGap: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        fontSize: fontSizes.smallText,
        textAlign: 'center',
        color: colors.blueDarkest,
    },
    closeIcon: {
        fontSize: fontSizes.vSmallText,
        color: colors.blueDarkest,
    },
});

export default ScrollableBadges;
