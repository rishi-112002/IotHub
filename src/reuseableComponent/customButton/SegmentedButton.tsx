import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import fontSizes from "../../assets/fonts/FontSize";
import colors from "../../assets/color/colors";
import { FlatList } from "react-native-gesture-handler";

export function SegmentedButton(props: { options: string[], onChange: any, selectedIndex: number }) {
    const { onChange, options, selectedIndex } = props;
    const renderItem = useCallback(
        ({ item, index }: { item: any, index: any }) => (

            <TouchableOpacity onPress={() => onChange(index)} style={{
                backgroundColor: index === selectedIndex ? colors.AppPrimaryColor : colors.white,
                padding: 4, borderRadius: 4
            }}>
                <Text style={{
                    fontSize: fontSizes.vSmallText,
                    color: index === selectedIndex ? colors.white : colors.HelperTextColor
                }}>
                    {item}
                </Text>

            </TouchableOpacity>



        ), [selectedIndex, onChange]
    )
    return (
        <FlatList
            data={options}
            renderItem={renderItem}
            contentContainerStyle={{
                backgroundColor: colors.vLightGray,
                flexDirection: "row", columnGap: 2, padding: 2, borderRadius: 4
            }}
            keyExtractor={(_item, index) => index.toString()}

        />
    )

}