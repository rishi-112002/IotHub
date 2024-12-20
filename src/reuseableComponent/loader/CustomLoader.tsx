import { View, ActivityIndicator, StyleSheet } from "react-native"
import colors from "../../assets/color/colors"
import React from "react"
import { ComponentStyles } from "../../styles/ComponentStyles"
import { ContainerStyles } from "../../styles/ContainerStyles";

function CustomLoader() {
    const { containerStyles } = ContainerStyles();
    return (
        <View style={containerStyles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.blueDarkest} />
        </View>
    )

}
export default CustomLoader