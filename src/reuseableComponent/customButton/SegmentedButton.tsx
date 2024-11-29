import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import fontSizes from "../../assets/fonts/FontSize";
import colors from "../../assets/color/colors";
import { FlatList } from "react-native-gesture-handler";
import { Colors2 } from "../../assets/color/Colors2";

export function SegmentedButton(props: { options: string[], onChange: any, selectedIndex: number }) {
    const { onChange, options, selectedIndex } = props;
    console.log("selctedIndex", selectedIndex)
    const renderItem = useCallback(
        ({ item, index }: { item: any, index: any }) => (

            <TouchableOpacity onPress={() => onChange(index)} style={{
                backgroundColor: index === selectedIndex ? colors.AppPrimaryColor : "transparent",
                padding: 4, borderRadius: 4
            }}>
                <Text style={{ fontSize: fontSizes.vSmallText  ,
                 color: index === selectedIndex ? colors.white :Colors2.HelperTextColor}}>
                    {item}
                </Text>

            </TouchableOpacity>



        ), [selectedIndex , onChange]
    )
    return (
        <FlatList
            data={options}
            renderItem={renderItem}
            contentContainerStyle={{ backgroundColor: "#F9F9F9", 
                flexDirection: "row", columnGap: 10, padding: 2 ,  borderRadius: 4 }}
            keyExtractor={(_item, index) => index.toString()}

        />
    )

}