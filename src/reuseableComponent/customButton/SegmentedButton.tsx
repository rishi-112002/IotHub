import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import colors from "../../assets/color/colors";
import { FlatList } from "react-native-gesture-handler";
import { ButtonStyles } from "../../styles/ButtonStyles";
import { ContainerStyles } from "../../styles/ContainerStyles";

export function SegmentedButton(props: { options: string[], onChange: any, selectedIndex: number }) {
    const { onChange, options, selectedIndex } = props;
    const { buttonStyles } = ButtonStyles();
    const { containerStyles } = ContainerStyles();
    const renderItem = useCallback(
        ({ item, index }: { item: any, index: any }) => (

            <TouchableOpacity onPress={() => onChange(index)}
                style={{
                    backgroundColor: index === selectedIndex ? colors.AppPrimaryColor : colors.white,
                    padding: 4, borderRadius: 4
                }}>
                <Text style={[buttonStyles.segemntedButtonText, {
                    color: index === selectedIndex ? colors.white : colors.HelperTextColor
                }]}>
                    {item}
                </Text>
            </TouchableOpacity>

        ), [selectedIndex, onChange]
    )
    return (
        <FlatList
            data={options}
            renderItem={renderItem}
            contentContainerStyle={[containerStyles.segmentedContainer,
            { flexDirection: 'row' }
            ]}
            keyExtractor={(_item, index) => index.toString()}
        />
    )

}