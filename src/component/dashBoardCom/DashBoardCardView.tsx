import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SegmentedButton } from "../../reuseableComponent/customButton/SegmentedButton";
import { Strings } from "../../assets/constants/Lable";
import { ComponentStyles } from "../../styles/ComponentStyles";
import { TextStyles } from "../../styles/TextStyles";
import { ButtonStyles } from "../../styles/ButtonStyles";
import { CardStyles } from "../../styles/CardStyles";
import { ContainerStyles } from "../../styles/ContainerStyles";

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
    const { styles } = ComponentStyles();
    const { textStyles } = TextStyles();
    const { buttonStyles } = ButtonStyles();
    const { cardStyles } = CardStyles();
    const { containerStyles } = ContainerStyles()
    const [selectedValue, setSelectedValue] = useState(Strings.CONNECTED_S);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleValueChange = useCallback((index: number) => {

        setSelectedIndex(index);
        setSelectedValue(index === 0 ? Strings.CONNECTED_S : Strings.NOT_CONNECTED_S)
    }, []);
    const options = [Strings.CONNECTED, Strings.NOT_CONNECTED]
    const renderSpot = useCallback(
        ({ item }: { item: any }) => (
            <TouchableOpacity style={cardStyles.card} onPress={item.onPress}>
                <Text
                    style={[
                        cardStyles.cardCount,
                        {
                            color: item.countColor
                        },
                    ]}
                >
                    {item.count}
                </Text>
                <Text style={textStyles.cardTitle}>{item.name}</Text>
            </TouchableOpacity>
        ),
        [selectedValue]
    );



    return (
        <View style={containerStyles.container}>
            {/* Header Section */}
            <View style={styles.headerRow}>
                <View style={containerStyles.SubContainer}>
                    <View>

                        <Text style={textStyles.heading}>{heading}</Text>
                        <Text style={textStyles.totalText}>{Strings.TOTAL}: {totalCount}</Text>
                    </View>
                    {
                        type === "eventLog" ?
                            <View style={styles.SubView}>
                                <TouchableOpacity style={buttonStyles.viewAllButton} onPress={ViewAllPress}>
                                    <Text style={textStyles.viewAllText}>{Strings.VIEW_ALL}</Text>
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
                contentContainerStyle={cardStyles.cardRow}
                renderItem={renderSpot}
                keyExtractor={(_item, index) => index.toString()}
            />

            {/* View All Button */}
            {type !== "eventLog" &&

                <TouchableOpacity style={buttonStyles.viewAllButton} onPress={ViewAllPress}>
                    <Text style={textStyles.viewAllText}>{Strings.VIEW_ALL}</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default DashboardCardView;