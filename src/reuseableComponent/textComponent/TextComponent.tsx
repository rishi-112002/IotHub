import React from "react";
import { Text, View } from "react-native";
import { ComponentStyles } from "../../styles/ComponentStyles";
import { TextStyles } from "../../styles/TextStyles";

export function TextComponent(props: { name: string, value: any, error: any }) {
    const { error, name, value } = props;
    const { textStyles } = TextStyles();
    const { styles } = ComponentStyles();
    return (
        <View style={styles.section}>
            <View style={styles.row}>
                <Text style={textStyles.sectionTitle}>{name}:</Text>
                <Text style={textStyles.sectionText}>{value}</Text>
            </View>
            {error !== null &&
                <Text style={textStyles.sectionText}>{error}</Text>
            }
        </View >
    )

}