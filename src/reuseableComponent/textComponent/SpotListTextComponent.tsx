import { View, Text } from "react-native";
import React from "react";
import { TextStyles } from "../../styles/TextStyles";

export function SpotlistTextComponent(props: { name: string, value: any }) {
    const { name, value } = props
    const { textStyles } = TextStyles();

    return (
        <View>
            <Text style={textStyles.label}>{name}:</Text>
            <Text style={textStyles.valueText}>
                {value}
            </Text>
        </View>
    )
}
