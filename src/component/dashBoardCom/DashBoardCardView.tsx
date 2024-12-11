import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fontSizes from "../../assets/fonts/FontSize";
import colors from "../../assets/color/colors";
import { SegmentedButton } from "../../reuseableComponent/customButton/SegmentedButton";
import { Strings } from "../../assets/constants/Lable";

function DashboardCardView(props: {
    connectedCards: { icon: string; name: string; count: number; onPress: any, countColor: string, backgroundColor: string }[];
    notConnectedCards: { icon: string; name: string; count: number; onPress: any, countColor: string, backgroundColor: string }[];
    heading: string;
    totalCount: number;
    ViewAllPress: any;
    type: "connectivity" | "useability" | "eventLog";
    card: { icon: string; name: string; count: number; onPress: any, countColor: string, backgroundColor: string }[];
}) {
    const { connectedCards, notConnectedCards, card, heading, totalCount, ViewAllPress, type } = props;
    const [selectedValue, setSelectedValue] = useState(Strings.CONNECTED_S);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleValueChange = useCallback((index: number) => {

        setSelectedIndex(index);
        setSelectedValue(index === 0 ? Strings.CONNECTED_S : Strings.NOT_CONNECTED_S)
    }, []);
    const options = [Strings.CONNECTED, Strings.NOT_CONNECTED]
    const renderSpot = useCallback(
        ({ item }: { item: any }) => (
            <TouchableOpacity style={styles.card} onPress={item.onPress}>
                <Text
                    style={[
                        styles.cardCount,
                        {
                            color: item.countColor
                        },
                    ]}
                >
                    {item.count}
                </Text>
                <Text style={styles.cardTitle}>{item.name}</Text>
            </TouchableOpacity>
        ),
        [selectedValue]
    );



    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerRow}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                    <View>

                        <Text style={styles.heading}>{heading}</Text>
                        <Text style={{ fontSize: fontSizes.smallText }}>{Strings.TOTAL}: {totalCount}</Text>
                    </View>
                    {
                        type === "eventLog" ?
                            <View style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                                <TouchableOpacity style={styles.viewAllButton} onPress={ViewAllPress}>
                                    <Text style={styles.viewAllText}>{Strings.VIEW_ALL}</Text>
                                </TouchableOpacity>
                            </View>
                            :

                            <View>
                                {type === "connectivity" && (
                                    <SegmentedButton options={options}
                                        onChange={handleValueChange} selectedIndex={selectedIndex}
                                    />

                                )}
                            </View>
                    }
                </View>
            </View>

            {/* Cards Row */}
            <FlatList
                style={{ height: type !== "eventLog" ? "55%" : 0 }}
                data={type === "useability" ? card : selectedValue === Strings.CONNECTED_S ? connectedCards : notConnectedCards}
                numColumns={2} // Two cards per row
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardRow}
                renderItem={renderSpot}
                keyExtractor={(_item, index) => index.toString()}
            />

            {/* View All Button */}
            {type !== "eventLog" &&

                <TouchableOpacity style={styles.viewAllButton} onPress={ViewAllPress}>
                    <Text style={styles.viewAllText}>{Strings.VIEW_ALL}</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default DashboardCardView;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    heading: {
        fontSize: fontSizes.heading,
        fontWeight: "bold",
        color: "#000",
    },
    segmentedButton: {
        padding: 0,
    },
    cardRow: {
        alignItems: "center",
        paddingHorizontal: 0,
    },
    card: {
        width: "45%", // Each card takes 45% of the row width
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.DividerColor,
        paddingTop: 15,
        paddingBottom: 10,
        margin: 5, // Small margin for spacing
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        height: "80%"
    },
    cardTitle: {
        fontSize: fontSizes.text,
        fontWeight: "500",
        color: colors.SecondaryTextColor,
        marginTop: 5,
        textAlign: "center",
    },
    cardCount: {
        fontSize: fontSizes.subheader,
        fontWeight: "bold",
    },
    viewAllButton: {
        alignSelf: "flex-end",
    },
    viewAllText: {
        color: colors.AppPrimaryColor,
        fontSize: fontSizes.text,
        fontWeight: "500",
    },
});
